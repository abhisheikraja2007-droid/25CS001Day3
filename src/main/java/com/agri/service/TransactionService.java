package com.agri.service;

import com.agri.model.PurchaseOrder;
import com.agri.repository.PurchaseOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class TransactionService {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Transactional
    public PurchaseOrder createPurchaseOrder(PurchaseOrder order) {
        if (order.getStatus() == null) {
            order.setStatus("PO Confirmed");
        }
        if (order.getCreatedDate() == null) {
            order.setCreatedDate("Created " + LocalDate.now().toString());
        }
        return purchaseOrderRepository.save(order);
    }

    @Transactional
    public PurchaseOrder confirmPurchaseOrder(String orderId) {
        PurchaseOrder order = purchaseOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));
                
        if ("PO Confirmed".equals(order.getStatus())) {
            order.setStatus("Bill Received");
            // In a full implementation, this would also hit the Budget or Ledger modules.
            return purchaseOrderRepository.save(order);
        } else {
            throw new IllegalStateException("Order cannot be confirmed. Current status: " + order.getStatus());
        }
    }
}
