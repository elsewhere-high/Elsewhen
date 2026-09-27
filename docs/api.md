# API 与权限

完整请求和响应结构以运行中的 `http://127.0.0.1:8317/docs` 与 `/openapi.json` 为准。以下是主要入口；游戏状态、阶段与数据格式由 `backend/app/models.py` 定义。

| 入口 | 用途 |
| --- | --- |
| `GET /health` | API 健康状态 |
| `POST /games/preflight` | 检查每个 AI 模型的响应和工具调用能力 |
| `POST /games` | 创建配置好的游戏和访问凭据 |
| `GET /games/{session_id}/state` | 获取经过查看者权限过滤的状态 |
| `POST /games/{session_id}/begin` | 启动已创建的游戏 |
| `POST /games/{session_id}/pause`、`/continue` | 房主暂停和继续 |
| `GET /games/{session_id}/timeline` | 历史时间线 |
| `GET /games/{session_id}/branch-points` | 可回溯节点 |
| `POST /games/{session_id}/branches` | 从检查点创建新分支 |
| `GET /games/{session_id}/room` | 房间与席位邀请管理 |
| `DELETE /games/{session_id}/data` | 房主授权删除游戏及关联数据 |
| `POST /forest` | 创建独立森林会话 |
| `POST /forest/talk` | 森林角色对话 |
| `/mcp` | 绑定身份后的游戏工具服务 |

创建结果中的 `host_token` 属于房主，每个人类席位另有 `access_token`。后续请求必须携带操作所需的凭据；客户端不能自行声明秘密角色或绕过回合限制。不要把房主密钥放进公开截图、日志或示例链接。

森林会话使用返回令牌对应的 Bearer 授权。对话带有 `request_id`，重复的相同请求不会重复调用模型；相同标识配不同内容会被拒绝。

运营档案使用 `GAME_HISTORY_ACCESS_KEY`。默认未配置时不可远程读取全体游戏记录。CORS 默认只允许本地 Elsewhen 前端；扩展部署地址时明确修改允许列表，不使用任意来源代替授权。
