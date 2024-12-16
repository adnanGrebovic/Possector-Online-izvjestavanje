export interface ResponseRacuna {
    Id: string
    InvoiceNumber: number
    Items: Item[]
    Tag: any
    DateCreated: string
    Waiter: Waiter
    Customer: any
    PaymentType: PaymentType
    PrintOn: any
    PrintOrder: boolean
    Table: Table
    PayUrl: any
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
    Image: any
    Price: number
    SubCategoryName: any
    BlockArticleFromSale: boolean
    EnableModifiers: boolean
    Taxes: any
    Ingredients: any[]
    Modifiers: any[]
    ArticleModifierSubcategories: any
  }
  
  export interface Waiter {
    IsDeleted: boolean
    Id: string
    Name: string
    AllowVoidInvoice: boolean
    AllowAccessToTakenTables: boolean
    AllowToCancelOrders: boolean
    AllowDiscount: boolean
    AllowEdit: boolean
    AllowViewInvoices: boolean
    AllowEndShift: boolean
    AllowSettings: boolean
    Password: any
    AllowCancelOrderItems: boolean
    TaxNumber: any
    OnlyMyRevenue: boolean
    AllowAccesToStorage: boolean
    AllowBackoffice: boolean
    AllowAccessToReports: boolean
    AllowMoveToTable: boolean
    AllowToCancelTable: boolean
    AllowToAccessOrdersReport: boolean
    SectorIds: any
  }
  
  export interface PaymentType {
    Order: number
    Id: string
    Name: string
    IsCash: boolean
    IsOrder: boolean
  }
  
  export interface Table {
    Id: number
    Name: string[]
    Order: number
    X: number
    Y: number
    Rotation: number
    Type: number
    State: number
    Waiter: any
    Deleted: boolean
    Orders: any
  }