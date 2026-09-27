using UnrealBuildTool;
public class Elsewhen : ModuleRules
{
    public Elsewhen(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
        PublicDependencyModuleNames.AddRange(new[] {"Core", "CoreUObject", "Engine", "InputCore", "HTTP", "Json", "Slate", "SlateCore", "TextToSpeech", "AudioCaptureCore"});
    }
}
