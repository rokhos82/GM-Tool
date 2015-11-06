var gm = {};

gm.states = {
    dashboard: "dashboard",
    npcs: "npcs"
};

gm.types = {}; // Lists of types - for example, types of NPCs or types of news alerts.
gm.objects = {}; // Data struct helper objects

gm.objects.type = function(title,quantity,selector) {
    this.title = title;
    this.quantity = quantity;
    this.selector = selector;
};

gm.thresholds = {
    hp: {
        warn: 8,
        danger: 4
    }
};