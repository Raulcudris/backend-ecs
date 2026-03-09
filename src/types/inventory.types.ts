export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryItemDTO {
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
}

export interface UpdateInventoryItemDTO {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  category?: string;
}