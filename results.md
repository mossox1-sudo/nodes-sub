# 免费公共节点优选结果（真实网页加载实测）

测试时间：2026-10-21 晚（CST）。测试工具：本地 Xray-core 26.3.27，逐个节点单独启动客户端实测。

候选节点共 **135** 个（来自 6 个 GitHub 聚合源，去重后）；其中 9 个因链接格式无法解析跳过，实际发起测试 126 个；**通过 18 个**。

## 通过标准（缺一不可）

- T1：经该节点访问 `https://www.google.com/generate_204` 返回 204；
- T2：经该节点打开谷歌首页 `https://www.google.com/` 返回 200 且正文 > 10 KB（真页面，不是只连上）；
- T3（通过后附加）：查询出口 IP 的国家/城市。
- 注：有 1 个节点谷歌按出口地区返回 302 跳转，已跟随跳转验证最终页面为 200 且内容完整后才计入通过。

## 数据来源（GitHub 聚合仓库）

| 仓库 | 最近更新 | 本次取用 | 通过数 |
|---|---|---|---|
| Pawdroid/Free-servers | 2026-10-21 11:00 UTC | 20 | 7 |
| free-nodes/v2rayfree | 2026-10-21 09:13 UTC | 40 | 3 |
| mfuu/FreeProxies | 2026-10-21（当日有更新） | 30 | 0 |
| peasoft/NoMoreWalls | 2026-10-21 03:26 UTC | 25 | 5 |
| zhuhaiuk/free-nodes | 2026-10-21 08:28 UTC | 10 | 3 |
| ermaozi/get_subscribe | 2026-10-21 00:39 UTC | 10 | 0 |

另排查过但未采用：Jsnzkpg/Jsnzkpg（订阅文件是加密内容，提取不出节点）、xiaoji235/airport-free（已停更，最后提交 2026-09-23，更新脚本已停用）。

## 通过节点排名（按谷歌首页加载耗时）

| 排名 | 协议 | 出口国家/城市 | 谷歌首页耗时 | 来源 |
|---|---|---|---|---|
| 1 | vless | 美国 New York City | 0.78 秒 | zhuhaiuk/free-nodes |
| 2 | vless | 未知 | 1.29 秒 | peasoft/NoMoreWalls |
| 3 | trojan | 法国 Paris | 1.3 秒 | Pawdroid/Free-servers |
| 4 | vless | 荷兰 Amsterdam | 1.55 秒 | Pawdroid/Free-servers |
| 5 | vless | 保加利亚 Sofia | 1.68 秒 | Pawdroid/Free-servers |
| 6 | vless | 荷兰 Amsterdam | 1.74 秒 | free-nodes/v2rayfree |
| 7 | vless | 荷兰 Amsterdam | 1.81 秒 | free-nodes/v2rayfree |
| 8 | vless | 芬兰 Helsinki | 2.01 秒 | Pawdroid/Free-servers |
| 9 | vless | 荷兰 Amsterdam | 2.32 秒 | free-nodes/v2rayfree |
| 10 | ss | 意大利 Milan | 2.56 秒 | Pawdroid/Free-servers |
| 11 | vless | 美国 San Jose | 2.81 秒 | zhuhaiuk/free-nodes |
| 12 | vless | 阿联酋 Fujairah | 5.13 秒 | peasoft/NoMoreWalls |
| 13 | ss | 意大利 Milan | 5.65 秒 | Pawdroid/Free-servers |
| 14 | vless | 美国 Salt Lake City | 5.72 秒 | zhuhaiuk/free-nodes |
| 15 | vless | 阿联酋 Dubai | 6.77 秒 | peasoft/NoMoreWalls |
| 16 | vless | 白俄罗斯 Minsk | 6.85 秒 | peasoft/NoMoreWalls |
| 17 | vless | 未知 | 7.91 秒 | Pawdroid/Free-servers |
| 18 | vless | 白俄罗斯 Minsk | 7.99 秒 | peasoft/NoMoreWalls |

完整节点链接见同目录 `nodes.txt`（按速度排序，最多 20 个，可直接导入 v2rayN / Nekoray / Shadowrocket 等客户端）；全部 135 个候选的逐条测试记录见 `results.json`。

## 注意事项

- 免费公共节点寿命很短，通常几小时到几天就会失效，失效后重新找新节点即可，不必纠结某一个。
- 这类节点是和很多陌生人共用的，速度和稳定性波动大，只适合临时应急浏览。
- **千万不要用这类节点登录银行、支付、邮箱主账号等重要账户**，也不要传输敏感信息：运营者不明，存在被记录流量的风险。
- 本次测速在沙箱环境里经一层出口中转完成，耗时含中转开销；在你自己的网络里实际速度可能不同（通常更快）。
- 出口国家以测试时查询到的 IP 归属为准，个别经 CDN 的节点出口会漂移。
