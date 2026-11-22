import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

/// Hospital Equipment, Beds & Critical Resources Endpoint
class ResourceEndpoint extends Endpoint {
  /// List hospital resources (e.g. beds, ventilators, wheelchairs, oxygen)
  Future<List<HospitalResource>> getResources(
    Session session, {
    String? type,
  }) async {
    return await HospitalResource.db.find(
      session,
      where: (t) => type != null && type != 'All'
          ? t.resourceType.equals(type)
          : Constant.bool(true),
      orderBy: (t) => t.identifier,
    );
  }

  /// Update resource operational status (available, occupied, maintenance)
  Future<HospitalResource> updateStatus(
    Session session,
    int resourceId,
    String status,
  ) async {
    final resource = await HospitalResource.db.findById(session, resourceId);
    if (resource == null) throw Exception('Resource not found');

    resource.status = status;
    return await HospitalResource.db.updateRow(session, resource);
  }
}
