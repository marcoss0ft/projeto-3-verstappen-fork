import teamColors from "../TeamColors";

export default function ApplyTeamColors(teamId) {
    if (teamId === null) {

        document.documentElement.style.setProperty('--sidebar-bg-color', '#807F7F');
        document.documentElement.style.setProperty('--icon-bg-color', '#FF1D00');
        document.documentElement.style.setProperty('--appbar-bg-color', '#FF1D00');
        document.documentElement.style.setProperty('--background-color', '#5A5A5A');
        console.log('Cores redefinidas para os valores padrão.');
        return;
    }

    const colors = teamColors[teamId];
    if (colors) {
      document.documentElement.style.setProperty('--sidebar-bg-color', colors.sidebarBgColor);
      document.documentElement.style.setProperty('--icon-bg-color', colors.iconBgColor);
      document.documentElement.style.setProperty('--appbar-bg-color', colors.appbarBgColor);
      document.documentElement.style.setProperty('--background-color', colors.backgroundColor);
      console.log('Cores aplicadas:', colors);
    }
}