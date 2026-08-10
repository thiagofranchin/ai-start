import { CodeTopic } from '@/types';

export const codeTopics: CodeTopic[] = [
  {
    id: 'python',
    label: 'Python',
    icon: '🐍',
    intro: 'Versionamento de Python com pyenv — instalação no macOS, WSL e Windows, e o dia a dia de troca de versão.',
    groups: [
      {
        title: 'Instalar pyenv-win — Windows (PowerShell)',
        commands: [
          { cmd: 'Remove-Item -Recurse -Force "$env:USERPROFILE\\.pyenv" -ErrorAction SilentlyContinue', comment: 'Remove uma instalação anterior incompleta (ex.: falha no módulo Expand-Archive) — pule se for a primeira instalação' },
          { cmd: 'git clone https://github.com/pyenv-win/pyenv-win.git "$HOME\\.pyenv"', comment: 'Clona o pyenv-win via Git — evita o bug do instalador oficial (.ps1), que depende do módulo Expand-Archive e pode falhar silenciosamente; não exige pip nem Python previamente instalado' },
          { cmd: '[System.Environment]::SetEnvironmentVariable(\'PYENV\',$env:USERPROFILE + "\\.pyenv\\pyenv-win\\","User")', comment: 'Define a variável de ambiente PYENV apontando para a instalação' },
          { cmd: '[System.Environment]::SetEnvironmentVariable(\'PYENV_ROOT\',$env:USERPROFILE + "\\.pyenv\\pyenv-win\\","User")', comment: 'Define PYENV_ROOT, exigida pelo pyenv-win' },
          { cmd: '[System.Environment]::SetEnvironmentVariable(\'PYENV_HOME\',$env:USERPROFILE + "\\.pyenv\\pyenv-win\\","User")', comment: 'Define PYENV_HOME, exigida pelo pyenv-win' },
          { cmd: '[System.Environment]::SetEnvironmentVariable(\'Path\', $env:USERPROFILE + "\\.pyenv\\pyenv-win\\bin;" + $env:USERPROFILE + "\\.pyenv\\pyenv-win\\shims;" + [System.Environment]::GetEnvironmentVariable(\'Path\', "User"),"User")', comment: 'Coloca o pyenv-win no PATH do usuário' },
          { cmd: '$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")', comment: 'Recarrega o PATH na sessão atual (ou abra um novo PowerShell)' },
        ],
      },
      {
        title: 'Instalar pyenv — macOS (Homebrew)',
        commands: [
          { cmd: 'brew install pyenv', comment: 'Instala o pyenv via Homebrew' },
          { cmd: 'echo \'export PYENV_ROOT="$HOME/.pyenv"\' >> ~/.zshrc', comment: 'Define onde o pyenv foi instalado' },
          { cmd: 'echo \'[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"\' >> ~/.zshrc', comment: 'Coloca o pyenv no PATH — precisa vir antes do eval' },
          { cmd: 'echo \'eval "$(pyenv init - zsh)"\' >> ~/.zshrc', comment: 'Ativa o pyenv no shell (por último, depois do PATH)' },
          { cmd: 'source ~/.zshrc', comment: 'Recarrega o shell com a nova configuração' },
        ],
      },
      {
        title: 'Instalar pyenv — WSL (Ubuntu/Debian)',
        commands: [
          { cmd: 'sudo apt update && sudo apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev', comment: 'Instala as dependências de build exigidas pelo Python' },
          { cmd: 'curl https://pyenv.run | bash', comment: 'Instala o pyenv via script oficial' },
          { cmd: 'echo \'export PYENV_ROOT="$HOME/.pyenv"\' >> ~/.bashrc', comment: 'Define onde o pyenv foi instalado' },
          { cmd: 'echo \'[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"\' >> ~/.bashrc', comment: 'Coloca o pyenv no PATH — precisa vir antes do eval' },
          { cmd: 'echo \'eval "$(pyenv init - bash)"\' >> ~/.bashrc', comment: 'Ativa o pyenv no shell (por último, depois do PATH, senão o eval falha)' },
          { cmd: 'source ~/.bashrc', comment: 'Recarrega o shell com a nova configuração' },
        ],
      },
      {
        title: 'Gerenciar versões do Python (macOS, WSL e Windows)',
        commands: [
          { cmd: 'pyenv --version', comment: 'Confirma que o pyenv em si foi instalado corretamente' },
          { cmd: 'pyenv install --list', comment: 'Lista todas as versões disponíveis para instalação' },
          { cmd: 'pyenv install 3.12.4', comment: 'Instala uma versão específica do Python' },
          { cmd: 'pyenv versions', comment: 'Lista as versões já instaladas na máquina' },
          { cmd: 'pyenv global 3.12.4', comment: 'Define a versão padrão para todo o sistema' },
          { cmd: 'pyenv local 3.11.9', comment: 'Define a versão só para a pasta atual (cria .python-version)' },
          { cmd: 'pyenv version', comment: 'Mostra qual versão do Python está ativa no diretório atual' },
          { cmd: 'python --version', comment: 'Confirma a versão do Python que o comando "python" está realmente usando' },
          { cmd: 'pyenv uninstall 3.11.9', comment: 'Remove uma versão instalada' },
        ],
      },
    ],
  },
  {
    id: 'node',
    label: 'Node',
    icon: '🟢',
    intro: 'Versionamento de Node com nvm — instalação e o dia a dia de troca de versão.',
    groups: [
      {
        title: 'Instalar nvm — macOS & WSL',
        commands: [
          { cmd: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash', comment: 'Baixa e instala o nvm (mesmo comando nas duas plataformas)' },
          { cmd: 'source ~/.bashrc', comment: 'Recarrega o shell no WSL (use ~/.zshrc no macOS)' },
        ],
      },
      {
        title: 'Gerenciar versões do Node',
        commands: [
          { cmd: 'nvm list-remote', comment: 'Lista todas as versões do Node disponíveis' },
          { cmd: 'nvm install 20', comment: 'Instala a versão 20 (LTS) do Node' },
          { cmd: 'nvm list', comment: 'Lista as versões instaladas localmente' },
          { cmd: 'nvm use 20', comment: 'Passa a usar a versão 20 na sessão atual do terminal' },
          { cmd: 'nvm alias default 20', comment: 'Define a versão 20 como padrão em novos terminais' },
          { cmd: 'nvm current', comment: 'Mostra qual versão está ativa no momento' },
          { cmd: 'node --version', comment: 'Confirma a versão do Node que o comando "node" está realmente usando' },
          { cmd: 'nvm uninstall 18', comment: 'Remove uma versão instalada' },
        ],
      },
    ],
  },
  {
    id: 'fcc',
    label: 'Free Claude Code',
    icon: '🆓',
    intro: 'Comandos do Free Claude Code — ferramenta gratuita para rodar o Claude Code, Codex e outros agentes de IA direto do terminal.',
    repoUrl: 'https://github.com/Alishahryar1/free-claude-code',
    groups: [
      {
        title: 'Free Claude Code',
        commands: [
          { cmd: 'fcc-claude', comment: 'Inicia o Claude Code via Free Claude Code' },
          { cmd: 'fcc-codex', comment: 'Inicia o Codex via Free Claude Code' },
          { cmd: 'fcc-init', comment: 'Inicializa/configura o Free Claude Code no projeto atual' },
          { cmd: 'fcc-server', comment: 'Sobe o servidor do Free Claude Code' },
          { cmd: 'free-claude-code', comment: 'Comando principal do Free Claude Code' },
        ],
      },
    ],
  },
];
