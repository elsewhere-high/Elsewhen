# 开发与架构

Elsewhen 的浏览器界面通过 REST 提交操作，通过 SSE 接收状态、活动和图执行信息。FastAPI 管理会话入口与身份验证；LangGraph 管理阶段推进、持久化检查点和等待人类输入；每个 AI 席位使用独立的上下文与记忆。模型提出的行动经过 MCP 身份绑定和游戏规则验证后才会生效。

## 数据与信息边界

- PostgreSQL 保存游戏、事件、访问令牌摘要、私人笔记、关系记忆和检查点。
- 房主凭据、席位凭据与运营档案密钥用途不同，不互相替代。
- 浏览器收到的是对应席位获准查看的状态投影。秘密角色、私人行动和其他席位的提示不会进入普通玩家投影。
- 回溯创建新游戏分支，不覆盖原记录；公开回放与 God Mode 回放使用不同信息范围。
- 隐藏思维链不是观测数据。界面展示模型给出的简短理由、工具行为和已记录证据。

## 环境与命令

Python 3.12 位于 `elsewhen` Conda 环境。`backend/uv.lock` 固定完整依赖及测试依赖，`backend/requirements.lock` 保留带哈希的运行依赖清单。`setup.sh` 将这些依赖安装到 Conda 环境，不创建项目 `.venv`。

```bash
# 单独启动 API；先启动 docker compose up -d postgres
cd backend
conda run --no-capture-output -n elsewhen python -m uvicorn app.main:app --host 127.0.0.1 --port 8317

# 在另一个终端，从项目根目录启动前端
pnpm --dir frontend dev
```

前端使用 Next.js App Router。修改框架特定 API 前查阅已安装版本的 `frontend/node_modules/next/dist/docs`。`pnpm typecheck` 先生成路由类型再运行 TypeScript。

`scripts/local.py` 记录进程 PID、启动信息和命令，仅关闭仍与该记录一致的本项目进程。日志与状态存放在被忽略的 `.run` 中。生产构建不包含数据库和凭据。

## 检查

推荐 `./check.sh`。单项前端检查：

```bash
pnpm --dir frontend lint
pnpm --dir frontend typecheck
pnpm --dir frontend test:exploration
pnpm --dir frontend test:inspector
pnpm --dir frontend build
```

后端测试使用专用 `elsewhen_test` 数据库。测试夹具会截断游戏和检查点表，禁止指向实际游戏数据库。测试与应用应使用不同端口、数据库名和凭据。

Mock 测试覆盖完整图和工具路径，但不能证明真实模型账户、语音设备、付费图片服务或原生图形引擎可用。这些集成需要各自的运行条件。

后端目前是源码运行的应用，`tool.uv.package = false`；没有 Python wheel 发布或安装产物流程。前端生产产物由 `pnpm build` 生成。
