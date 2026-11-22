import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/theme/app_theme.dart';
import 'providers/auth_provider.dart';
import 'providers/queue_provider.dart';
import 'providers/assistant_provider.dart';
import 'views/common/navigation_shell.dart';
import 'views/auth/login_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CareFlowApp());
}

class CareFlowApp extends StatelessWidget {
  const CareFlowApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => QueueProvider()),
        ChangeNotifierProvider(create: (_) => AssistantProvider()),
      ],
      child: MaterialApp(
        title: 'CareFlow QFlip Mobile',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        home: const NavigationShell(),
        routes: {
          '/login': (_) => const LoginScreen(),
          '/home': (_) => const NavigationShell(),
        },
      ),
    );
  }
}
