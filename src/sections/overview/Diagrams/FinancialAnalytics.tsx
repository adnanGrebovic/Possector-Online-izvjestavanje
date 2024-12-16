import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useAppSelector } from 'src/data/ConfigureData';
import { Typography } from '@mui/material';



const size = {
    width: 400,
    height: 200,
};

const StyledText = styled('text')<{ fontSize: number }>(({ theme, fontSize }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: `${fontSize}px`,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    const fontSize = Math.max(12, Math.min(20, 200 / `${children}`.length));
    return (
        <StyledText x={left + width / 2} y={top + height / 2} fontSize={fontSize}>
            {children}
        </StyledText>
    );
}


function extractNumber(value: any): number {
    if (typeof value === 'number') return value;

    if (!value || typeof value !== 'string') return 0;

    const cleanedString = value.replace(/[^0-9.,-]/g, '');

    const hasComma = cleanedString.includes(',');
    const hasDot = cleanedString.includes('.');
    const isEuropeanFormat = hasComma && (!hasDot || cleanedString.indexOf(',') > cleanedString.indexOf('.'));

    const normalizedString = isEuropeanFormat
        ? cleanedString.replace(/\./g, '').replace(',', '.')
        : cleanedString.replace(/,/g, '');

    const number = parseFloat(normalizedString);

    return Number.isNaN(number) ? 0 : number;
}



export default function PieChartFinancialStatus() {
    const { porezi } = useAppSelector(state => state.taxes_total);
    const {cashRegister}= useAppSelector(state=>state.cash_register);

    if (!porezi || !porezi.Items || porezi.Items.length < 2) {
        return null;
    }

    const totalFormatted = extractNumber(porezi?.Items[0].TotalFormatted ?? '0') + extractNumber(porezi?.Items[1].TotalFormatted ?? '0') + extractNumber(porezi?.Items[2].TotalFormatted ?? '0');
    const totalTax = (Number(porezi?.Items[0].Value) ?? 0) + (Number(porezi?.Items[1].Value) ?? 0) + (Number(porezi?.Items[2].Value) ?? 0);
    const totalProfit = totalFormatted - totalTax;
    const value25 = Number(porezi?.Items[0].Value ?? 0);
    const value13 = Number(porezi?.Items[1].Value ?? 0);
    const valuePP = Number(porezi?.Items[2].Value ?? 0);
    const purchasedGoodsTotal = Array.isArray(cashRegister)
    ? cashRegister.reduce((sum, register) => sum + extractNumber(register.PurchasedGoodsTotal), 0)
    : 0;

    const data = [
        { value: totalProfit, label: 'Profit' },
        { value: purchasedGoodsTotal, label: 'Kupljena roba' },
        { value: extractNumber(value25), label: 'PDV 25%' },
        { value: extractNumber(value13), label: 'PDV 13%' },
        { value: extractNumber(valuePP), label: 'PP 3%' },
    ];



    return (
        <div>
            <Typography variant="h6" align="center" sx={{ mb: 2, position: 'relative', right: '40px' }}>
                Financial Status Analytics
            </Typography>
            <PieChart  series={[{ data, innerRadius: 80 }]} {...size}>
                <PieCenterLabel> {totalFormatted} € </PieCenterLabel>
            </PieChart>
        </div>
    );
}
