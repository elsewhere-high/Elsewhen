using UnrealBuildTool;
using System.Collections.Generic;
public class ElsewhenEditorTarget : TargetRules
{
    public ElsewhenEditorTarget(TargetInfo Target) : base(Target)
    {
        Type = TargetType.Editor;
        DefaultBuildSettings = BuildSettingsVersion.Latest;
        ExtraModuleNames.Add("Elsewhen");
    }
}
