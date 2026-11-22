import 'package:serverpod/serverpod.dart';
import 'src/generated/protocol.dart';
import 'src/endpoints/auth_endpoint.dart';
import 'src/endpoints/queue_endpoint.dart';
import 'src/endpoints/department_endpoint.dart';
import 'src/endpoints/triage_endpoint.dart';

void run(List<String> args) async {
  // Initialize Serverpod and connect it with the generated protocol
  final pod = Serverpod(
    args,
    Protocol(),
    Endpoints(),
  );

  // Start the Serverpod engine
  await pod.start();
}

class Endpoints extends EndpointDispatch {
  @override
  void initializeEndpoints(Server server) {
    var endpoints = <String, Endpoint>{
      'auth': AuthEndpoint(),
      'queue': QueueEndpoint(),
      'department': DepartmentEndpoint(),
      'doctor': DoctorEndpoint(),
      'triage': TriageEndpoint(),
    };

    connectEndpoints(server, endpoints);
  }
}
