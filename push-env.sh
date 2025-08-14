#!/bin/bash

# 自动获取当前分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" == "HEAD" ]; then
    echo "❌ 当前处于分离 HEAD 状态，请先切到一个分支再推送"
    exit 1
fi
echo "📌 当前分支：$CURRENT_BRANCH"

# 检查是否有未提交更改
if [ -n "$(git status --porcelain)" ]; then
    echo "💾 检测到未提交的更改"
    read -p "请输入 commit 信息: " COMMIT_MSG
    if [ -z "$COMMIT_MSG" ]; then
        echo "❌ commit 信息不能为空，退出"
        exit 1
    fi
    git add .
    git commit -m "$COMMIT_MSG"
else
    echo "✅ 没有未提交的更改，直接推送"
fi

# 选择目标分支
echo "请选择要推送的目标分支："
echo "1) 测试环境 (test)"
echo "2) 正式环境 (official)"
read -p "输入数字 1 或 2: " choice

if [ "$choice" == "1" ]; then
    TARGET_BRANCH="test"
elif [ "$choice" == "2" ]; then
    TARGET_BRANCH="official"
else
    echo "❌ 输入错误，请输入 1 或 2"
    exit 1
fi

# 推送
echo "🚀 正在将 $CURRENT_BRANCH 推送到 $TARGET_BRANCH ..."
git push origin "$CURRENT_BRANCH:$TARGET_BRANCH"
if [ $? -eq 0 ]; then
    echo "✅ 推送完成：$CURRENT_BRANCH → $TARGET_BRANCH"
else
    echo "❌ 推送失败，请检查 Git 状态"
fi
