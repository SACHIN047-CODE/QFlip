class DepartmentModel {
  final String id;
  final String name;
  final String code;
  final String description;
  final String floor;
  final List<String> roomNumbers;
  final int averageWaitTime;
  final int dailyCapacity;
  final bool isActive;

  DepartmentModel({
    required this.id,
    required this.name,
    required this.code,
    required this.description,
    required this.floor,
    required this.roomNumbers,
    this.averageWaitTime = 15,
    this.dailyCapacity = 100,
    this.isActive = true,
  });

  factory DepartmentModel.fromJson(Map<String, dynamic> json) {
    List<String> rooms = [];
    if (json['roomNumbers'] is List) {
      rooms = (json['roomNumbers'] as List).map((e) => e.toString()).toList();
    }

    return DepartmentModel(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      code: json['code'] ?? '',
      description: json['description'] ?? '',
      floor: json['floor']?.toString() ?? 'Ground Floor',
      roomNumbers: rooms,
      averageWaitTime: json['averageWaitTime'] ?? 15,
      dailyCapacity: json['dailyCapacity'] ?? 100,
      isActive: json['isActive'] ?? true,
    );
  }
}
