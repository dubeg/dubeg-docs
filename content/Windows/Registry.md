---
date: 2018-09-27
title: Registry
menu:
    sidebar:
        parent: Windows
---

Root keys and their respective function.

Below are listed the five hierarchical hives seen in Figure 1, with a very basic description of each. Beside the root key is their commonly referred to abbreviation in parenthesis, which will frequently be referred to as throughout the paper.

## HKEY_CLASSES_ROOT (HKCR)
Information stored here ensures that the correct program opens when it is executed in Windows Explorer. It also contains further details on drag-and-drop rules, shortcuts, and information on the user interface. Alias for: HKLM\Software\Classes

## HKEY_CURRENT_USER (HKCU)
Contains configuration information for the user who is currently logged into the system, including user's folders, screen colors, and Control Panel settings. Alias for a user specific branch in HKEY_USERS. The generic information usually applies to all users and is HKU\.DEFAULT.

## HKEY_LOCAL_MACHINE (HKLM)
Contains machine hardware-specific information that the operating system runs on. It includes a list of drives mounted on the system and generic configurations of installed hardware and applications.

## HKEY_USERS (HKU)
Contains configuration information of all user profiles on the system, which concerns application configurations, and visual settings.

## HKEY_CURRENT_CONFIG (HCU)
Stores information about the systems current configuration. Alias for: HKLM\Config\profile