// http://www.kriesi.at/archives/create-simple-tooltips-with-css-and-jquery
// http://www.kriesi.at/wp-content/extra_data/tooltip_tutorial_2/step1.html

function simple_tooltip(target_items, name) {
    $(target_items).each(function (i) {
        $("body").append("<div class='" + name + "' id='" + name + i + "'><p>" + $(this).attr('title') + "</p></div>");
        var my_tooltip = $("#" + name + i);

        if ($(this).attr("title") != "" && $(this).attr("title") != null) {

            $(this).removeAttr("title").mouseover(function () {
                my_tooltip.css({ opacity: 1, display: "none" }).fadeIn(400);
            }).mousemove(function (kmouse) {
                var border_top = $(window).scrollTop();
                var border_right = $(window).width();
                var left_pos;
                var top_pos;
                var offset = 10;
                if (border_right - (offset * 2) >= my_tooltip.width() + kmouse.pageX) {
                    left_pos = kmouse.pageX + offset;
                } else {
                    left_pos = border_right - my_tooltip.width() - offset;
                }

                if (border_top + (offset * 2) >= kmouse.pageY - my_tooltip.height()) {
                    top_pos = border_top + offset;
                } else {
                    top_pos = kmouse.pageY - my_tooltip.height() - offset;
                }

                my_tooltip.css({ left: left_pos, top: top_pos });
            }).mouseout(function () {
                my_tooltip.css({ left: "-9999px" });
            });

        }

    });
}