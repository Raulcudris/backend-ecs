import fs from 'fs/promises';
import path from 'path';
import { InventoryItem, CreateInventoryItemDTO, UpdateInventoryItemDTO } from '../types/inventory.types';
import { logger } from '../lib/logger';

const DATA_FILE = path.join(__dirname, '../data/inventory.json');

export class JsonService {
  private async ensureDataFile(): Promise<void> {
    try {
      await fs.access(DATA_FILE);
    } catch (error) {
      const dataDir = path.join(__dirname, '../data');
      try {
        await fs.access(dataDir);
      } catch {
        await fs.mkdir(dataDir, { recursive: true });
      }
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
      logger.info('📁 Archivo inventory.json creado');
    }
  }

  private async readData(): Promise<InventoryItem[]> {
    await this.ensureDataFile();
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Error leyendo archivo JSON:', error);
      return [];
    }
  }

  private async writeData(data: InventoryItem[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  async getAll(): Promise<InventoryItem[]> {
    return await this.readData();
  }

  async getById(id: string): Promise<InventoryItem | null> {
    const items = await this.readData();
    return items.find(item => item.id === id) || null;
  }

  async create(data: CreateInventoryItemDTO): Promise<InventoryItem> {
    const items = await this.readData();
    
    const newItem: InventoryItem = {
      id: this.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    items.push(newItem);
    await this.writeData(items);
    logger.info(`📦 Item creado: ${newItem.name} (ID: ${newItem.id})`);
    
    return newItem;
  }

  async update(id: string, data: UpdateInventoryItemDTO): Promise<InventoryItem | null> {
    const items = await this.readData();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) {
      return null;
    }

    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    await this.writeData(items);
    logger.info(`📦 Item actualizado: ${items[index].name} (ID: ${id})`);
    return items[index];
  }

  async delete(id: string): Promise<boolean> {
    const items = await this.readData();
    const filteredItems = items.filter(item => item.id !== id);

    if (filteredItems.length === items.length) {
      return false;
    }

    await this.writeData(filteredItems);
    logger.info(`📦 Item eliminado (ID: ${id})`);
    return true;
  }
}

export const jsonService = new JsonService();