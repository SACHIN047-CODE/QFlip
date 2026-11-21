import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'glass_card.dart';

enum BentoCardVariant { glass, solid, teal, ai, danger, flat }

class BentoCard extends StatelessWidget {
  final Widget child;
  final BentoCardVariant variant;
  final Widget? title;
  final String? subtitle;
  final Widget? icon;
  final Widget? action;
  final Widget? badge;
  final EdgeInsetsGeometry padding;
  final EdgeInsetsGeometry? margin;
  final double borderRadius;
  final VoidCallback? onTap;

  const BentoCard({
    Key? key,
    required this.child,
    this.variant = BentoCardVariant.glass,
    this.title,
    this.subtitle,
    this.icon,
    this.action,
    this.badge,
    this.padding = const EdgeInsets.all(18.0),
    this.margin,
    this.borderRadius = 20.0,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Color bg;
    Color border;
    bool isGlass = false;

    switch (variant) {
      case BentoCardVariant.glass:
        bg = AppTheme.glassSurface;
        border = AppTheme.glassBorder;
        isGlass = true;
        break;
      case BentoCardVariant.solid:
        bg = Colors.white;
        border = AppTheme.border;
        break;
      case BentoCardVariant.teal:
        bg = AppTheme.softTeal.withOpacity(0.85);
        border = AppTheme.primaryTeal.withOpacity(0.25);
        break;
      case BentoCardVariant.ai:
        bg = AppTheme.aiAccent.withOpacity(0.04);
        border = AppTheme.aiAccent.withOpacity(0.2);
        break;
      case BentoCardVariant.danger:
        bg = AppTheme.danger.withOpacity(0.04);
        border = AppTheme.danger.withOpacity(0.2);
        break;
      case BentoCardVariant.flat:
        bg = const Color(0xFFF1F5F9);
        border = Colors.transparent;
        break;
    }

    Widget content = Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (title != null || icon != null || badge != null || action != null) ...[
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              if (icon != null) ...[
                icon!,
                const SizedBox(width: 8),
              ],
              if (title != null)
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      DefaultTextStyle(
                        style: Theme.of(context).textTheme.titleMedium!.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                        child: title!,
                      ),
                      if (subtitle != null) ...[
                        const SizedBox(height: 2),
                        Text(
                          subtitle!,
                          style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              if (badge != null) badge!,
              if (action != null) action!,
            ],
          ),
          const SizedBox(height: 14),
        ],
        child,
      ],
    );

    if (isGlass) {
      return GlassCard(
        blur: 10,
        padding: padding,
        margin: margin,
        borderRadius: borderRadius,
        backgroundColor: bg,
        borderColor: border,
        onTap: onTap,
        child: content,
      );
    }

    Widget container = Container(
      padding: padding,
      margin: margin,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(borderRadius),
        border: Border.all(color: border, width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: content,
    );

    if (onTap != null) {
      return InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(borderRadius),
        child: container,
      );
    }

    return container;
  }
}

