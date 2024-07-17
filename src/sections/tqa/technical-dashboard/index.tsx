export const setColorSeries = (label) => {
    if (label === "Planning")
        return "#7fd2e0";
    if (label === "Making" || label === "Assigned")
        return "#38afd1";
    if (label === "Finished" || label === "Unassigned")
        return "#2596be";
}

export const DASHBOARD_COLORS = {
    propgressBar: {
        top: "#2D8BBA",
        bottom: "#86CCF3",
    },
    chart: {
        darker: "#2D8BBA",
        dark: "#41B8D5",
        main: "#6CE5E8",
        light: "",
    },
    charts: ["#2D8BBA", "#41B8D5", "#6CE5E8"],
    text: {
        title: "#065a99",
    }

}