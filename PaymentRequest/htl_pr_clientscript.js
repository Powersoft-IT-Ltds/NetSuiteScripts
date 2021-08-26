/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */
 /*
 Changes For Following
 1.Classification on Changes to be set to default
 2.Default TDS Section
 3.Set Default values on Changes For Tds Section,Line Amt
 */
define(['N/search', 'N/currentRecord', 'N/record'], function(search, currentRecord, records) {
    var record = currentRecord.get();

    function fieldChanged(context) {
        if (context.fieldId == 'custrecordppl_pr_vendor_name') {
            var vendor_name = record.getValue('custrecordppl_pr_vendor_name');
            if (vendor_name == '') return;

            /* var vendorSearch = search.create({
          type: 'VendorSubsidiaryRelationship',
          filters: [['entity','is',vendor_name]],
          columns: ['subsidiary']
        });

        var vendorSearchResults = vendorSearch.run().getRange({ start: 0, end: 1000 });
//alert(vendorSearchResults.length);
         for(var i in vendorSearchResults) {
         //  alert( vendorSearchResults[i].id);
           alert( vendorSearchResults[i].getValue('subsidiary'));
         }
        var vendfield = record.getField('custrecordppl_pr_subsidiary');
     //   vendfield.removeSelectOption({value : null});
        if(vendorSearchResults.length != 0) {
          for(var i in vendorSearchResults) {
            vendfield.insertSelectOption({
                value : vendorSearchResults[i].id,
                text : vendorSearchResults[i].getValue('subsidiary')
            });
          }
        }*/
        }
        if (context.fieldId == 'custrecordppl_pr_india_tds_section') {
            var tds_sec_id = record.getValue('custrecordppl_pr_india_tds_section');
            //alert('tds_sec_id'+tds_sec_id);
            if (tds_sec_id == '') return;

            var tds_sec_obj = records.load({
                type: 'customrecord_in_tds_setup',
                id: tds_sec_id,
                isDynamic: true
            });
            var tds_rate = parseFloat(tds_sec_obj.getValue({
                fieldId: 'custrecord_in_tds_setup_rate'
            }));

            record.setValue({
                fieldId: 'custrecord_prepayment_tds_rate',
                value: tds_rate,
                ignoreFieldChange: true
            });

            /*alert(record.getValue('custrecordppl_pr_line_amt'));
            alert(isNaN(record.getValue('custrecordppl_pr_line_amt')));
            alert(((record.getValue('custrecordppl_pr_line_amt') * tds_rate) / 100));*/
            CalculateNetPay(record);
        }
     /* if (context.fieldId == 'custrecordppl_pr_line_amt' || context.fieldId == 'custrecord2' ) 
      {
        var customElement = contextRecord.getField({ fieldId: context.fieldId });
        alert(customElement);
        if (context.fieldId == 'custrecord2')
          {
            if (!isNaN(contextRecord.getValue('custrecordppl_pr_line_amt')) && !isNaN(contextRecord.getValue('custrecord2'))) 
            {
              if(contextRecord.getValue('custrecordppl_pr_line_amt')<contextRecord.getValue('custrecord2'))
                 {
              alert('Change Value')
                  customElement.focus();
                   
                   return;
                }

            }

          }
       
            CalculateNetPay(record);
       
      }*/
       if (context.fieldId == 'custrecordppl_pr_line_amt' || context.fieldId == 'custrecord2') 
      {
      CalculateNetPay(record);
      }
    }

    function CalculateNetPay(contextRecord) {
        if (!isNaN(contextRecord.getValue('custrecordppl_pr_line_amt')) && !isNaN(contextRecord.getValue('custrecord_prepayment_tds_rate'))) {
            contextRecord.setValue({
                fieldId: 'custrecordppl_pr_tds_deduction',
                value: parseFloat(((contextRecord.getValue('custrecordppl_pr_line_amt') * contextRecord.getValue('custrecord_prepayment_tds_rate')) / 100)),
                ignoreFieldChange: true
            });
        }
        if (!isNaN(contextRecord.getValue('custrecordppl_pr_line_amt')) && !isNaN(contextRecord.getValue('custrecord2'))) {
            contextRecord.setValue({
                fieldId: 'custrecordppl_pr_amount',
                value: parseFloat((contextRecord.getValue('custrecordppl_pr_line_amt') + contextRecord.getValue('custrecord2'))),
                ignoreFieldChange: true
            });
        }

        if (!isNaN(contextRecord.getValue('custrecordppl_pr_amount')) && !isNaN(contextRecord.getValue('custrecordppl_pr_tds_deduction'))) {
            contextRecord.setValue({
                fieldId: 'custrecordppl_pr_net_amount',
                value: parseFloat((contextRecord.getValue('custrecordppl_pr_amount') - contextRecord.getValue('custrecordppl_pr_tds_deduction'))),
                ignoreFieldChange: true
            });
        }

    }

    //}

    return {
        fieldChanged: fieldChanged
    };

});