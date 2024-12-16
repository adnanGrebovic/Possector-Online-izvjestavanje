import { pdf } from '@react-pdf/renderer';
import { CgFileDocument } from 'react-icons/cg';
import { HiOutlineDownload } from 'react-icons/hi';
import React, {  } from 'react';
import { saveAs } from 'file-saver';
import { useAppSelector } from 'src/data/ConfigureData';
import TaxesTags from './TaxesTags';
import GoodsSpent from './GoodsSpent';
import PaymentType from './PaymentType';

interface PdfCardProps {
    title: string;
}

export const PdfCard: React.FC<PdfCardProps> = ({ title }) => {

    const styles: { [key: string]: React.CSSProperties } = {
        container: { width: '220px', borderRadius: '5px', padding: '15px 12px', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)" },
        flex: { width: '100%', display: 'flex', gap: '5px', alignItems: 'center' },
        bold: { fontSize: '13px', fontWeight: 600 },
        thin: { fontSize: '11px', color: '#6f6f6f', fontWeight: 500 },
        btn: { borderRadius: '3px', border: '1px solid gray', display: 'flex', alignItems: 'center', gap: '2px', padding: '3px', fontSize: '11px', color: '#4f4f4f', fontWeight: 600, cursor: 'pointer', userSelect: 'none' }
    }

    const { vrstePlacanja, loading } = useAppSelector((state) => state.payment_types);


    const handleDownload = async () => {

        console.log(vrstePlacanja);
        if (vrstePlacanja) {
            const blob = await pdf(<PaymentType vrstePlacanja={vrstePlacanja} />).toBlob();
            saveAs(blob, 'PaymentType.pdf');
            console.log(blob);
        }
        else {
            console.error('No payment types available to download.');
        }

    };




    return (

        <div style={styles.container}>
            <div style={styles.flex}>
                <CgFileDocument color='#90e0ef' size={20} />
                <span style={styles.bold}>{title}</span>
            </div>
            <div style={styles.thin}>
                PDF
            </div>
            <div style={{ ...styles.flex, ...{ justifyContent: 'space-between' } }}>
                <button
                    type="button"
                    onClick={handleDownload}
                    style={styles.btn}
                >
                    <HiOutlineDownload size={14} />
                    <span>Download PDF</span>
                </button>

            </div>
        </div>
    )


}

export default PdfCard



