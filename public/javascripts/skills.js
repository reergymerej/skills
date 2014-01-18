$(function () {
  $.get('/json/skills.json', function (skills) {
    var $container = $('#skills');

    skills.sort(function (a, b) {
      var attribute = 'interest',
        dir = 0;

      if (a[attribute] < b[attribute]) {
        dir = 1;
      } else if (b[attribute] < a[attribute]) {
        dir = -1;
      } else {
        dir = (a.tech < b.tech) ? -1 : 1;
      }
      return dir;
    });

    function createSkill (i, skill) {
      var $div = $('<div />', {
        html: skill.tech,
        css: {
          fontSize: (1 + skill.skill / 10) + 'em',
          opacity: skill.interest / 10
        },
        class: skill.type
      });

      $container.append($div);
    }

    $.each(skills, createSkill);
  });
});