import { Request, Response } from 'express';
import { jsonService } from '../services/json.service';

export class InventoryController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await jsonService.getAll();
      res.json({
        success: true,
        data: items
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los items del inventario',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await jsonService.getById(id);

      if (!item) {
        res.status(404).json({
          success: false,
          message: 'Item no encontrado'
        });
        return;
      }

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener el item',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const newItem = await jsonService.create(req.body);
      res.status(201).json({
        success: true,
        data: newItem
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear el item',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedItem = await jsonService.update(id, req.body);

      if (!updatedItem) {
        res.status(404).json({
          success: false,
          message: 'Item no encontrado'
        });
        return;
      }

      res.json({
        success: true,
        data: updatedItem
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el item',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await jsonService.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Item no encontrado'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Item eliminado correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el item',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const inventoryController = new InventoryController();