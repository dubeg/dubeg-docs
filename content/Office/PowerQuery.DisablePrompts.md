# Disable prompts
PowerQuery AddIn:HKEY_LOCAL_MACHINE\SOFTWARE[\WOW6432Node]\Microsoft\Microsoft Power Query for Excel
For Office 2016: HKEY_LOCAL_MACHINE\SOFTWARE[\WOW6432Node]\Microsoft\Office\16.0\PowerQuery

## Native Query
```
HKEY_LOCAL_MACHINE\Software[\Wow6432Node]\Microsoft\Office\16.0\PowerQuery
	DisableNativeDbQueryPrompt (DWORD)
		0: Enabled
		1: Disabled
```


## Privacy Level
```
HKEY_LOCAL_MACHINE\Software[\Wow6432Node]\Microsoft\Office\16.0\PowerQuery
	GlobalPrivacyLevel (DWORD)
		0: Always ignore privacy level settings
		1: Combine data according to each file's Privacy Level settings
		2: Always combine data according to your Privacy Level settings for each source
```