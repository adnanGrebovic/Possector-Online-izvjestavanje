import { Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import React, { Fragment, useEffect, useState } from 'react';
import { Racuni } from 'src/models/racuni';

interface InvoiceProps {
    racuni: Racuni[];
  }

export const Invoice: React.FC<InvoiceProps> = ({racuni}) => {
    


    const styles = StyleSheet.create({

        page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

        spaceBetween : {flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" },

        titleContainer: {flexDirection: 'row',marginTop: 24},
        
        logo: { width: 90 },

        reportTitle: {  fontSize: 16,  textAlign: 'center' },

        addressTitle : {fontSize: 11,fontStyle: 'bold'}, 
        
        invoice : {fontWeight: 'bold',fontSize: 20},
        
        invoiceNumber : {fontSize: 11,fontWeight: 'bold'}, 
        
        address : { fontWeight: 400, fontSize: 10},
        
        theader : {marginTop : 20,fontSize : 10,fontStyle: 'bold',paddingTop: 4 ,paddingLeft: 7 ,flex:1,height:20,backgroundColor : '#DEDEDE',borderColor : 'whitesmoke',borderRightWidth:1,borderBottomWidth:1},

        theader2 : { flex:2, borderRightWidth:0, borderBottomWidth:1},

        tbody:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1, borderColor : 'whitesmoke', borderRightWidth:1, borderBottomWidth:1},

        total:{ fontSize : 9, paddingTop: 4 , paddingLeft: 7 , flex:1.5, borderColor : 'whitesmoke', borderBottomWidth:1},

        tbody2:{ flex:2, borderRightWidth:1, }

    })

    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
                <View style={styles.spaceBetween}>
                    <Text style={styles.reportTitle}>FISKALNI RACUN</Text>
                </View>
        </View>
    );



    const TableHead = () => (
        <View style={{ width:'100%', flexDirection :'row', marginTop:10}}>
                <View style={[styles.theader, styles.theader2]}>
                    <Text>Invoice number</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Date created</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Waiter name</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Payment type</Text>   
                </View>
                <View style={styles.theader}>
                    <Text>Total Price</Text>   
                </View>
                
            </View>
    );

    const TableBody = () => (
        racuni.map((receipt: Racuni, index)=>(
            <Fragment key={index}>
                <View style={{ width:'100%', flexDirection :'row'}}>
                    <View style={[styles.tbody, styles.tbody2]}>
                        <Text >{receipt.invoice_number}</Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.DateCreated} </Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.waiter_name}</Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.payment_type}</Text>   
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.total}</Text>   
                    </View>
                    
                </View>
            </Fragment>
           ))
    );

    const TableTotal = () => (
        <View style={{ width:'100%', flexDirection :'row'}}>
                <View style={styles.tbody}>
                    <Text>Total</Text>   
                </View>
                <View style={styles.tbody}>
                    <Text>
                    {racuni.reduce((acc, item) => acc + item.total, 0)}
                    </Text>  
                </View>
            </View>
    );

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <InvoiceTitle />
                <TableHead />
                <TableBody />
                <TableTotal />
            </Page>
        </Document>
    )
}
export default Invoice;