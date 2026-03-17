#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
热点分析 - 搜索关键词生成脚本

根据用户给定的「方向」和「时间描述」，生成各平台入口执行搜索时使用的关键词列表。
平台优先级：1）微信、今日头条、抖音、百度；2）政府政策公布网；3）微博、知乎、快手、小红书。
Agent 据此执行多次 Web Search 并汇总成热点表。

用法:
  python fetch_hotspots.py --direction "团餐数字化" --time "近一周"
  python fetch_hotspots.py -d "校园食品安全" -t "3月1日到3月10日"

输出: JSON 或 Markdown 格式的各平台搜索词列表（默认 stdout 输出 JSON）。
"""

import argparse
import json
import sys
from typing import Dict, List


def build_queries(direction: str, time_desc: str) -> Dict[str, List[str]]:
    """
    根据方向和时间描述，为各平台生成建议的搜索关键词列表。
    平台顺序即优先级：微信、今日头条、抖音、百度（最高）→ 政府政策网 → 微博、知乎、快手、小红书。
    无 API 时通过通用搜索引擎（如百度）搜各平台关键词覆盖各入口。
    """
    return {
        # 优先级 1
        "微信": [
            f"微信 公众号 {direction} {time_desc}",
            f"{direction} 微信 近期",
            f"公众号 {direction} {time_desc}",
        ],
        "今日头条": [
            f"今日头条 {direction} {time_desc}",
            f"{direction} 今日头条 最新",
            f"{direction} 头条 热点 {time_desc}",
        ],
        "抖音": [
            f"抖音 {direction} 近期",
            f"{direction} 抖音 热搜",
            f"{direction} 抖音 热门 {time_desc}",
        ],
        "百度": [
            f"{direction} {time_desc}",
            f"{direction} 最新",
            f"{direction} 热点",
            f"{direction} 新闻 {time_desc}",
        ],
        # 优先级 2
        "政府政策公布网": [
            f"{direction} 政策 政府 {time_desc}",
            f"{direction} 通报 监管 近期",
            f"{direction} 国务院 部委 通知",
            f"政府网站 {direction} {time_desc}",
        ],
        # 优先级 3
        "微博": [
            f"微博 {direction} {time_desc}",
            f"{direction} 微博 热搜",
            f"{direction} 微博 近期",
        ],
        "知乎": [
            f"知乎 {direction} {time_desc}",
            f"{direction} 知乎 热门",
            f"{direction} 知乎 近期",
        ],
        "快手": [
            f"快手 {direction} 近期",
            f"{direction} 快手 热门",
            f"{direction} 快手 {time_desc}",
        ],
        "小红书": [
            f"小红书 {direction} 热门",
            f"{direction} 小红书 近期",
            f"{direction} 小红书 {time_desc}",
        ],
    }


def output_json(queries: Dict[str, List[str]], direction: str, time_desc: str) -> str:
    """输出 JSON，便于程序解析。"""
    return json.dumps(
        {
            "direction": direction,
            "time_desc": time_desc,
            "platform_queries": queries,
        },
        ensure_ascii=False,
        indent=2,
    )


def output_markdown(queries: Dict[str, List[str]], direction: str, time_desc: str) -> str:
    """输出 Markdown，便于人工阅读与 Agent 按条执行搜索。平台顺序即优先级。"""
    lines = [
        f"# 热点搜索关键词：{direction} · {time_desc}",
        "",
        "请按以下顺序对各平台分别执行 Web Search（优先级 1 必做，2/3 视情况覆盖），将结果整理成热点表，**链接列须为 Markdown 超链 [原文](url)**。",
        "",
    ]
    for platform, keywords in queries.items():
        lines.append(f"## {platform}")
        for i, q in enumerate(keywords, 1):
            lines.append(f"- {i}. `{q}`")
        lines.append("")
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="生成各平台热点搜索关键词（微信、今日头条、抖音、百度、政府政策网、微博、知乎、快手、小红书，按优先级排序）"
    )
    parser.add_argument(
        "-d", "--direction",
        required=True,
        help="热点方向，例如：团餐数字化、校园食品安全",
    )
    parser.add_argument(
        "-t", "--time",
        required=True,
        dest="time_desc",
        help="时间范围描述，例如：近一周、3月1日到3月10日",
    )
    parser.add_argument(
        "-f", "--format",
        choices=["json", "markdown"],
        default="json",
        help="输出格式：json（默认）或 markdown",
    )
    args = parser.parse_args()

    direction = args.direction.strip()
    time_desc = args.time_desc.strip()

    if not direction or not time_desc:
        print("错误：方向和时间描述均不能为空。", file=sys.stderr)
        sys.exit(1)

    queries = build_queries(direction, time_desc)

    if args.format == "markdown":
        print(output_markdown(queries, direction, time_desc))
    else:
        print(output_json(queries, direction, time_desc))


if __name__ == "__main__":
    main()
