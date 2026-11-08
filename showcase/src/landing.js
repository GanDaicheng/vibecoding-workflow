const copyButton = document.querySelector("#copy-install");
const installCommand = document.querySelector("#install-command");
const copyStatus = document.querySelector("#copy-status");

async function copyInstallCommand() {
  const text = installCommand.textContent.trim();

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = text;
      temporaryInput.setAttribute("readonly", "");
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.append(temporaryInput);
      temporaryInput.select();
      const copied = document.execCommand("copy");
      temporaryInput.remove();
      if (!copied) throw new Error("Clipboard copy was not available.");
    }

    copyStatus.textContent = "安装命令已复制。";
    copyButton.textContent = "已复制";
  } catch {
    copyStatus.textContent = "无法自动复制，请选中上方命令并手动复制。";
    copyButton.textContent = "手动复制";
  }
}

copyButton.addEventListener("click", copyInstallCommand);
