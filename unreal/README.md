# Elsewhen 原生客户端

可选 Unreal Engine 5.8 客户端位于 `Elsewhen/Elsewhen.uproject`，包括第一人称森林场景和议会客户端源码。它使用同一个 Elsewhen API，不在客户端保存模型密钥。

先安装 Unreal Engine 和对应平台构建工具，设置引擎路径，然后启动网页项目的 API：

```bash
./start.sh
export UNREAL_ENGINE_ROOT="/path/to/UnrealEngine"
bash unreal/play.sh
```

WASD 移动，Shift 奔跑，F 切换提灯，R 自动沿路径行走，E 与附近角色交谈。森林对话使用服务端配置的真实模型；三个角色颁发印记后可离开森林。语音输入需要操作系统麦克风权限和有效的服务端语音配置。

离线 API 合约检查可以在已安装的 Conda 环境中执行，无需 Unreal：

```bash
cd backend
conda run --no-capture-output -n elsewhen python ../unreal/test_forest_api.py
```

该脚本使用替代决策检查授权、参数校验、记忆隔离、幂等与三印记完成，仅清理自己创建的森林会话。`--live` 和 `--voice` 会调用真实服务，只应在准备好凭据和计费条件时使用。

`SourceAssets/` 保存 Poly Haven CC0 源资源及校验信息。`import_forest.py` 用于引擎内导入。`.uasset` 资源已经附带，普通运行不需要重新导入。原生编译和画面验证必须在实际安装了 Unreal Engine 的机器完成。
