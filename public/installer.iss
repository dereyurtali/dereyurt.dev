[Setup]
AppName=HEDAP
AppVersion=1.0
AppPublisher=Aspilsan
DefaultDirName={autopf}\HEDAP
DefaultGroupName=HEDAP
OutputDir=installer_output
OutputBaseFilename=HEDAP_Setup_v1.0
Compression=lzma
SolidCompression=yes
SetupIconFile=HEDAP.ico
WizardStyle=modern

[Files]
Source: "deploy\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\HEDAP"; Filename: "{app}\HEDAP.exe"
Name: "{commondesktop}\HEDAP"; Filename: "{app}\HEDAP.exe"; Tasks: desktopicon

[Tasks]
Name: desktopicon; Description: "Create a desktop shortcut"; GroupDescription: "Additional icons:"

[Run]
Filename: "{app}\HEDAP.exe"; Description: "Launch HEDAP"; Flags: postinstall nowait skipifsilent
