export interface Racuni
{
    id: string;
    invoice_number: number;
    waiter_name: string;
    payment_type: string;
    total: number;
    DateCreated: string;
    tableItems: tableItems[]
}

interface tableItems {
      articlename: string;
      price: number;

} 


export interface Narudzbe {
    Id: string
    InvoiceNumber: number
    Items: Item[]
    Tag: any
    DateCreated: string
    Waiter: any
    Customer: any
    PaymentType: any
    PrintOn: any
    PrintOrder: boolean
    Table: any
    PayUrl: string
    PaymentTypeName: any
    WaiterName: any
    CustomerName: any
    TableName: any
    Name: string
    IsOrder: boolean
    Total: number
    DiscountPercentage: number
    ChangeOrderStateUrl: any
  }
  
  export interface Item {
    Id: string
    Price: number
    Article: Article
    Quantity: number
    DateCreated: string;
    ArticleName: any
    Total: number
    State: number
    TotalWithoutTax: number
    TotalWithoutDiscount: number
    Modifiers: any[]
    DiscountPercentage: number
    DiscountAmmount: number
    Note: string
    BasePriceWithoutDiscount: number
    BasePrice: number
    PriceWithoutDiscount: number
  }
  
  export interface Article {
    Id: string
    Name: string
    Image: string
    Price: number
    SubCategoryName: any
    BlockArticleFromSale: boolean
    EnableModifiers: boolean
    Taxes: any
    Ingredients: any[]
    Modifiers: any[]
    ArticleModifierSubcategories: any[]
  }

  

  export interface ParsedItems{
    Id: string;
    InvoiceNumber: number;
    Price: number;
    Total: number;
    Quantity: number;
    DateCreated: string;
    Article: ArticleItems;
  }

  export interface ArticleItems {
    Name: string;
    Price: number;
  }

  
  
