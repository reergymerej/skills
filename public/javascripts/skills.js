$(function () {
  $.get('/json/skills.json', function (skills) {
    var $container = $('#skills');


    // sortBy('skill');
    // sortBy('tech', 'asc');
    // sortBy('type', 'asc');


    function sortBy(attribute) {
      
      var descending = $('#descending').prop('checked') ? -1 : 1;
      attribute = attribute || $('#sortBy').val();

      skills.sort(function (a, b) {
        var dir = 0,
          x = a[attribute],
          y = b[attribute];

        if (typeof x === 'string') {
          x = x.toLowerCase();
          y = y.toLowerCase();
        }

        if (x < y) {
          dir = -1;
        } else if (y < x) {
          dir = 1;
        } else {
          dir = (a.tech < b.tech) ? -1 : 1;
        }
        return dir * descending;
      });

      $container.empty();
      $.each(skills, createSkill);
    }

    function createSkill (i, skill) {
      var fontSize = (10 + skill.skill * 3),
        $div = $('<div />', {
          html: skill.tech,
          css: {
            lineHeight: fontSize * .9 + 'px',
            paddingLeft: fontSize + 'px',
            letterSpacing: skill.skill + 'px',
            fontSize: fontSize + 'px',
            opacity: skill.interest / 10
          },
          class: skill.type
        });

      $container.append($div);
    }

    $('#sortBy').change(function () {
      sortBy($(this).val());
    }).focus();

    $('#descending').change(function () {
      sortBy();
    });

    sortBy('interest');
  });
});