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

    // function getSkill(tech) {
    //   var foundSkill;
    //   $.each(skills, function (i, skill) {
    //     if (skill.tech === tech) {
    //       foundSkill = skill;
    //       return false;
    //     }
    //   });
    //   return foundSkill;
    // }

    // function showStats(skill) {
    //   $('.skill').html(skill.skill);
    // }

    function createSkill (i, skill) {
      var $div = $('<div />', {
        html: skill.tech,
        css: {
          // fontSize: (1 + skill.skill / 10) + 'em',
          fontSize: (10 + skill.skill * 3) + 'px',
          opacity: skill.interest / 10
        },
        class: skill.type
      });

      $div.hover(
        function () {
          var skill = getSkill($(this).html());
          showStats(skill);
        },
        function () {

      });

      $container.append($div);
    }

    $.each(skills, createSkill);
  });
});