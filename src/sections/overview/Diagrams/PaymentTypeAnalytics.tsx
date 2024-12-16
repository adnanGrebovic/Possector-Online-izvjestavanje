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


export default function PieChartWithCenterLabel() {
    const { vrstePlacanja, loading } = useAppSelector(state => state.payment_types);

    if (!vrstePlacanja || !vrstePlacanja.Items || vrstePlacanja.Items.length < 2) {
        return null;
    }
    const data = [
        { value: extractNumber(vrstePlacanja?.Items[0].Value) ?? 0, label: vrstePlacanja?.Items[0].Name ?? '' },
        { value: extractNumber(vrstePlacanja?.Items[1].Value) ?? 0, label: vrstePlacanja?.Items[1].Name ?? '' },
    ];

    const totalValue =
        extractNumber(vrstePlacanja.Items[0].Value ?? 0) + extractNumber(vrstePlacanja.Items[1].Value ?? 0);

    return (
        <div>
            <Typography variant="h6" align="center" sx={{ mb: 2, position: 'relative', right: '40px' }}>
                Payment Type Distribution
            </Typography>
            <PieChart sx={{}} series={[{ data, innerRadius: 80 }]} {...size}>
                <PieCenterLabel>{totalValue} €</PieCenterLabel>
            </PieChart>
        </div>
    );
}