export interface UniverzalniItems{
    Id: string;
    Name: string;
    IsChecked: boolean;
    Url: string;
    Items: Items[];
}

export interface Items{
    Id: string;
    Name: string;
    Value: number;
    Quantity: number;
    Percentage: number;
    TotalFormatted: string;
}

