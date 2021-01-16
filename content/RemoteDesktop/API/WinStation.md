Sample: WinStation API


## Program.cs
```csharp
class Program {
    static void Main(string[] args) {
        var mgr = new TerminalServicesManager();
        using (var server = mgr.GetLocalServer()) {
            server.Open();
            foreach (var session in server.GetSessions()) {
                var clientName = session.ClientName;
                var wtsIpAddress = session.ClientIPAddress.ToString();
                var winIpAddress = Winsta.GetWinStationInformation(server, session.SessionId);
            }
        }

    }
}
```


## Winsta.cs
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using FILETIME = System.Runtime.InteropServices.ComTypes.FILETIME;

namespace Sample {

    public enum ConnectionState {
        Active,
        Connected,
        ConnectQuery,
        Shadowing,
        Disconnected,
        Idle,
        Listening,
        Reset,
        Down,
        Initializing
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct CACHE_STATISTICS {
        private readonly short ProtocolType;
        private readonly short Length;

        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 20)]
        private readonly int[] Reserved;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct PROTOCOLCOUNTERS {
        public int WdBytes;
        public int WdFrames;
        public int WaitForOutBuf;
        public int Frames;
        public int Bytes;
        public int CompressedBytes;
        public int CompressFlushes;
        public int Errors;
        public int Timeouts;
        public int AsyncFramingError;
        public int AsyncOverrunError;
        public int AsyncOverflowError;
        public int AsyncParityError;
        public int TdErrors;
        public short ProtocolType;
        public short Length;

        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 100)]
        public int[] Reserved;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct PROTOCOLSTATUS {
        public PROTOCOLCOUNTERS Output;
        public PROTOCOLCOUNTERS Input;
        public CACHE_STATISTICS Statistics;
        public int AsyncSignal;
        public int AsyncSignalMask;
    }

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    public struct WINSTATIONINFORMATIONW {
        public ConnectionState State;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 33)]
        public string WinStationName;

        public int SessionId;
        public int Unknown;
        public FILETIME ConnectTime;
        public FILETIME DisconnectTime;
        public FILETIME LastInputTime;
        public FILETIME LoginTime;
        public PROTOCOLSTATUS ProtocolStatus;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 18)]
        public string Domain;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 24)]
        public string UserName;

        public FILETIME CurrentTime;
    }

    public enum WINSTATIONINFOCLASS {
        WinStationCreateData,
        WinStationConfiguration,
        WinStationPdParams,
        WinStationWd,
        WinStationPd,
        WinStationPrinter,
        WinStationClient,
        WinStationModules,
        WinStationInformation,
        WinStationTrace,
        WinStationBeep,
        WinStationEncryptionOff,
        WinStationEncryptionPerm,
        WinStationNtSecurity,
        WinStationUserToken,
        WinStationUnused1,
        WinStationVideoData,
        WinStationInitialProgram,
        WinStationCd,
        WinStationSystemTrace,
        WinStationVirtualData,
        WinStationClientData,
        WinStationSecureDesktopEnter,
        WinStationSecureDesktopExit,
        WinStationLoadBalanceSessionTarget,
        WinStationLoadIndicator,
        WinStationShadowInfo,
        WinStationDigProductId,
        WinStationLockedState,
        WinStationRemoteAddress,
        WinStationIdleTime,
        WinStationLastReconnectType,
        WinStationDisallowAutoReconnect,
        WinStationUnused2,
        WinStationUnused3,
        WinStationUnused4,
        WinStationUnused5,
        WinStationReconnectedFromId,
        WinStationEffectsPolicy,
        WinStationType,
        WinStationInformationEx
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct WINSTATIONREMOTEADDRESS {
        public System.Net.Sockets.AddressFamily Family;
        public short Port;

        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 20)]
        public byte[] Address;

        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 6)]
        public byte[] Reserved;
    }

    public static class Winsta {

        [DllImport("winsta.dll", CharSet = CharSet.Unicode, EntryPoint = "WinStationQueryInformationW", SetLastError = true)]
        public static extern int WinStationQueryInformationRemoteAddress(IntPtr hServer, int sessionId,
                                                                 WINSTATIONINFOCLASS information,
                                                                 ref WINSTATIONREMOTEADDRESS buffer,
                                                                 int bufferLength, out int returnedLength);

        [DllImport("winsta.dll", CharSet = CharSet.Auto, SetLastError = true)]
        public static extern int WinStationQueryInformation(IntPtr hServer, int sessionId, int information,
                                                    ref WINSTATIONINFORMATIONW buffer, int bufferLength,
                                                    ref int returnedLength);

        public static WINSTATIONINFORMATIONW GetWinStationInformation(Cassia.ITerminalServerHandle server, int sessionId) {
            var retLen = 0;
            var wsInfo = new WINSTATIONINFORMATIONW();
            if (
                WinStationQueryInformation(server.Handle, sessionId,
                                                         (int)WINSTATIONINFOCLASS.WinStationInformation, ref wsInfo,
                                                         Marshal.SizeOf(typeof(WINSTATIONINFORMATIONW)), ref retLen) !=
                0) {
                return wsInfo;
            }
            throw new System.ComponentModel.Win32Exception();
        }
    }
}
```