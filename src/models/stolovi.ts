export interface Stolovi {
    Id: string
    Name: string|null
    Order: number
    X: number
    Y: number
    Rotation: number
    Type: number
    State: number
    Waiter: Waiter
    Deleted: boolean
    Orders: string
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
    Password: string
    AllowCancelOrderItems: boolean
    TaxNumber: string
    OnlyMyRevenue: boolean
    AllowAccesToStorage: boolean
    AllowBackoffice: boolean
    AllowAccessToReports: boolean
    AllowMoveToTable: boolean
    AllowToCancelTable: boolean
    AllowToAccessOrdersReport: boolean
    SectorIds: any
  }

  export interface ParsedStolovi {
    Id: string;
    Name: string|null;
    Waiter: string|null;
    Orders: string;
  }
  

