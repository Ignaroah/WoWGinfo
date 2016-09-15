$("#search-form-submit").click(function () {
    var guild = $("#search-form-guild").val();
    var realm = $("#search-form-realm").val();
    var region = $("#select-region").val();
    var guildMembersUrl = "https://us.api.battle.net/wow/guild/" +
        realm +
        "/" +
        guild +
        "?fields=members&locale=" +
        region + "&apikey=spgv8wsqctgavwe36z7uafrvhecjyf6z";
    $.get(guildMembersUrl)
        .then(function (data) {
        console.log(data);
        $("#hider").removeClass("hidden");
        var specCount = [];
        var classCount = [];
        var membersContainer = $("#members-container");
        $("#guild-name").text(data.name);
        membersContainer.empty();
        var memberHeader = document.createElement("div");
        $(memberHeader).text("Guild Members: ");
        memberHeader.id = "member-header";
        membersContainer.append(memberHeader);
        console.log(data.members.length);
        //          var classesDic: { [id: string]: number; } = {};
        //           classesDic['dsdsd'] = 4;
        for (var i = 0; i < data.members.length; i++) {
            var specSearch = false;
            var classSearch = false;
            var div = document.createElement("div");
            div.className = "member-template";
            var nameDiv = document.createElement("div");
            nameDiv.className = "charName";
            $(nameDiv).text(data.members[i].character.name);
            var levelDiv = document.createElement("div");
            levelDiv.className = "level";
            $(levelDiv).text(data.members[i].character.level);
            var classSpecDiv = document.createElement("div");
            classSpecDiv.className = "classSpec";
            var className = getClass(data.members[i].character.class);
            var searchClassName = className.replace(" ", "");
            try {
                var specName = data.members[i].character.spec.name;
                var searchSpecName = data.members[i].character.spec.name.replace(" ", "") + "_" + className.replace(" ", "");
                $(classSpecDiv).text(specName);
                for (var j = 0; j < specCount.length; j++) {
                    if (searchSpecName == specCount[j].name) {
                        specSearch = true;
                        specCount[j].count += 1;
                    }
                    ;
                }
                if (!specSearch) {
                    var specObject = {
                        name: searchSpecName,
                        count: 0
                    };
                    specCount.push(specObject);
                }
            }
            catch (e) {
            }
            for (var j = 0; j < classCount.length; j++) {
                //console.log(specCount[j].name)
                if (searchClassName == classCount[j].name) {
                    classSearch = true;
                    classCount[j].count += 1;
                }
            }
            if (!classSearch) {
                var classObject = {
                    name: searchClassName,
                    count: 0
                };
                classCount.push(classObject);
            }
            $(classSpecDiv).append(" ", className, " ");
            $(div).append(nameDiv, levelDiv, classSpecDiv);
            membersContainer.append(div);
        }
        for (var j = 0; j < classCount.length; j++) {
            var displayNum = $("#" + classCount[j].name);
            displayNum.text(classCount[j].count);
        } //Display classes counted
        for (var j = 0; j < specCount.length; j++) {
            var displayNum = $("#" + specCount[j].name);
            displayNum.text(specCount[j].count);
        } // Display specs counted
        $("#enter-guild-information").text("Enter a guild here: ");
        console.log(classCount);
        console.log(specCount);
    }, function (error) {
        $("#enter-guild-information").text("Something went wrong :( Please try entering a different guild");
        console.log(error);
    });
});
function getClass(classNum) {
    switch (classNum) {
        case 1:
            return "Warrior";
        case 2:
            return "Paladin";
        case 3:
            return "Hunter";
        case 4:
            return "Rogue";
        case 5:
            return "Priest";
        case 6:
            return "Death Knight";
        case 7:
            return "Shaman";
        case 8:
            return "Mage";
        case 9:
            return "Warlock";
        case 10:
            return "Monk";
        case 11:
            return "Druid";
        case 12:
            return "Demon Hunter";
    }
    return "Undefined";
}
//$(".classes").each((index, element) => {
//  var classesDiv = $(element);    
function toggleThis(_this) {
    console.log($(_this).children(".specs"));
    $(_this).closest(".specs").toggle();
}
$(".classes").on("click", function () {
    $(this).children('.specs').toggle();
});
$(".specs").on("click", function () {
    event.stopPropagation();
});
//})
$(".specs").each(function (index, element) {
    var specs = $(element);
    specs.hide();
});
