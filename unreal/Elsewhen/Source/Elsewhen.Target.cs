using UnrealBuildTool;
using System.Collections.Generic;
public class ElsewhenTarget : TargetRules
{
    public ElsewhenTarget(TargetInfo Target) : base(Target)
    {
        Type = TargetType.Game;
        DefaultBuildSettings = BuildSettingsVersion.Latest;
        ExtraModuleNames.Add("Elsewhen");
    }
}
