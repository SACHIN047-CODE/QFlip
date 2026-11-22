import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Jan Aushadhi Pharmacy Counter & Dispensary Endpoint
class PharmacyEndpoint extends Endpoint {
  /// Fetch all pharmacy dispensing orders
  Future<List<PharmacyOrder>> getOrders(
    Session session, {
    String? status,
  }) async {
    final list = await PharmacyOrder.db.find(
      session,
      where: (t) => status != null && status != 'All'
          ? t.status.equals(status)
          : Constant.bool(true),
      orderBy: (t) => t.createdAt,
    );
    return list.reversed.toList();
  }

  /// Update pharmacy order status (e.g. processing, dispensed)
  Future<PharmacyOrder> updateOrderStatus(
    Session session,
    int orderId,
    String status,
  ) async {
    final order = await PharmacyOrder.db.findById(session, orderId);
    if (order == null) throw Exception('Pharmacy order not found');

    order.status = status;
    if (status == 'dispensed') {
      order.dispensedAt = DateTime.now();
    }

    return await PharmacyOrder.db.updateRow(session, order);
  }
}
