/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
 
 define(['N/log', 'N/record' ],

 function(log,record,currentRecord) { 
 function afterSubmit(context)
 { // Create the purchase order.
 
 var creditid=12392
 var creditlistid=12393
   var credit_memo_record_obj= record.load({
      type: record.Type.VENDOR_CREDIT,
      id: creditid//record Id
    })
     
   
   log.debug({ title: 'This is a log title', 
	details: 'start- 123'+credit_memo_record_obj});

   var lineWithInvoice = credit_memo_record_obj.findSublistLineWithValue({
           sublistId: 'apply',
           fieldId: 'internalid',
           value: creditlistid
           });
   
  
   
     log.debug('objRecordlist',lineWithInvoice);
  log.debug({ title: 'This is a log title', 
	details: 'start-new- '+lineWithInvoice});
           //Get Total amount of invoice
           var totalToPay = credit_memo_record_obj.getSublistValue({
               sublistId: 'apply',
               fieldId: 'total',
               line: lineWithInvoice
           });

           //Set apply to Truth (checkbox)
           credit_memo_record_obj.setSublistValue({
               sublistId: 'apply',
               fieldId: 'apply',
               line: lineWithInvoice,
               value: true
           });
           credit_memo_record_obj.setSublistValue({
           sublistId: 'apply',
           fieldId: 'amount',
           line: lineWithInvoice,
           value: totalToPay
       });
   
    log.debug({ title: 'This is a log title', 
	details: 'before save- '+totalToPay});

   //credit_memo_record_obj.save();
   
   
     var rec =record.create({
        "type": record.Type.VENDOR_BILL,
        "isDynamic": false
    });
	

var recordId=creditid;
   
    var r= record.load({
         type: record.Type.VENDOR_CREDIT,
         id: recordId,
         isDynamic: true
      });
   
		rec.setValue({ fieldId: 'currency', value: r.getValue({fieldId: 'currency' }) });

		rec.setValue({ fieldId: 'location', value: r.getValue({fieldId: 'location' }) }); // Create one line in the item sublist. 
rec.setValue({ fieldId: 'tranid', value: 'VENDOR/CM/RTN' }); 
   
		rec.setValue({ fieldId: 'customform', value: '144' }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'subsidiary', value: r.getValue({fieldId: 'subsidiary' }) }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'exchangerate', value: r.getValue({fieldId: 'exchangerate' }) }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'postingperiod', value:  r.getValue({fieldId: 'postingperiod' }) }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'trandate', value:  r.getValue({fieldId: 'trandate' }) }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'entity', value: r.getValue({fieldId: 'entity' }) }); // Create one line in the item sublist. 
 		rec.setValue({ fieldId: 'usertotal', value: r.getValue({fieldId: 'usertotal' }) }); // Create one line in the item sublist. 
		rec.insertLine({"sublistId": "expense", "line": 0});
		rec.setSublistValue({"sublistId": "expense", "fieldId": "account", "value": 2464, "line": 0});
		rec.setSublistValue({"sublistId": "expense", "fieldId": "amount", "value": r.getValue({fieldId: 'usertotal' }) , "line": 0});
		//rec.save();

   
   
   
   log.debug({ title: 'This is a log title', 
	details: 'after save- '});
/*   var vendorBillPayment = record.create({
            type: record.Type.VENDOR_PAYMENT,
            isDynamic: false,
            defaultValues: {
                entity: 517
            }
        })

      vendorBillPayment.setValue({
            fieldId: 'acctid',
            value: 3640
        })
        vendorBillPayment.setValue({
            fieldId: 'account',
            value: 3539
        })

        vendorBillPayment.setValue({
            fieldId: 'currency',
            value: 1
        })

     

        vendorBillPayment.setValue({
            fieldId: 'exchangerate',
            value: "1.00"
        })
   	 vendorBillPayment.setSublistValue({
            sublistId: 'apply',
            fieldId: 'internalid',
            line: 1,
            value: "8163"
        });
   var vp = record.transform({fromType:'vendorbill', fromId:8163, toType:'vendorpayment'});
   
   vp.setSublistValue({sublistId:'apply', fieldId:'apply', line:1, value:true});

  
        var recordId = vendorBillPayment.save({
             enableSourcing: false,
             ignoreMandatoryFields: true
        })
       */
   
   
  
   
   
    var rec =record.create({
        "type": record.Type.VENDOR_CREDIT,
        "isDynamic": false
    });
	
   //var recordId=context.currentRecord.id;

//log.debug('recordId',nlapiGetRecordId());
var recordId=context.newRecord.id;
   
    var r= record.load({
         type: record.Type.VENDOR_PREPAYMENT,
         id: recordId,
         isDynamic: true
      });
     var mergeRecord = record.load({
       type: 'customrecord_prepayment_request', 
       id: r.getValue({fieldId: 'custbody_paymentrequest' }),
       isDynamic: true
     });

log.debug({title:'recordIdaa',details:r.getValue({fieldId: 'entity' }) });
  
		rec.setValue({ fieldId: 'currency', value: r.getValue({fieldId: 'currency' }) });

		rec.setValue({ fieldId: 'location', value: r.getValue({fieldId: 'location' }) }); // Create one line in the item sublist. 

		rec.setValue({ fieldId: 'customform', value: '129' }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'subsidiary', value: r.getValue({fieldId: 'subsidiary' }) }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'exchangerate', value: r.getValue({fieldId: 'exchangerate' }) }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'postingperiod', value:  r.getValue({fieldId: 'postingperiod' }) }); // Create one line in the item sublist. 
		rec.setValue({ fieldId: 'entity', value: r.getValue({fieldId: 'entity' }) }); // Create one line in the item sublist. 
   rec.setValue({ fieldId: 'memo', value: r.getValue({fieldId: 'transactionnumber' }) });
   var prepayamt=mergeRecord.getValue({fieldId: 'custrecordppl_pr_net_amount' });
   var tdsamt=mergeRecord.getValue({fieldId: 'custrecordppl_pr_tds_deduction' });
   var actprepay=r.getValue({fieldId: 'payment' });
  
var tdsamount=(actprepay*tdsamt)/prepayamt;

   rec.setValue({ fieldId: 'custbody_advprepayid', value:recordId });
   
		rec.insertLine({"sublistId": "expense", "line": 0});
		rec.setSublistValue({"sublistId": "expense", "fieldId": "account", "value": 2005, "line": 0});
		rec.setSublistValue({"sublistId": "expense", "fieldId": "amount", "value": tdsamount.toFixed(2) , "line": 0});


   // rec.save();

} 
   function beforeLoad (context) {
     log.debug({ title: 'This is a log title', 
	details: 'Here are the details of the log - '});

    }
return { afterSubmit: afterSubmit ,
        beforeLoad : beforeLoad 
 }; });