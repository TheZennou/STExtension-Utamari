let happyModeEnabled = false;

function addHappyModeToggle() {
  const happyModeToggleHtml = `
    <div id="happy_mode_extension" class="list-group-item flex-container flexGap5" title="Toggle Happy Mode">
      <div id="happy_mode_icon" class="fa-solid fa-face-smile extensionsMenuExtensionButton"></div>
      <span>Happy Mode</span>
      <input type="checkbox" id="happy_mode_checkbox">
    </div>`;
  $("#extensionsMenu").append(happyModeToggleHtml);
  
  $('#happy_mode_extension').on('click', function() {
    happyModeEnabled = !happyModeEnabled;
    updateHappyMode();
  });
}

function addHappyModeMessageButton() {
  const happyModeButtonHtml = `
    <div title="Toggle Happy Mode" class="mes_button mes_happy_mode fa-solid fa-face-smile interactable" data-i18n="[title]Toggle Happy Mode" tabindex="0"></div>`;
  $(".mes_buttons .extraMesButtons").append(happyModeButtonHtml);
}

function updateHappyMode() {
  if (happyModeEnabled) {
    console.log('Enabling Happy Mode');
    $('.mes_happy_mode, #happy_mode_icon').css('color', 'green');
    $('#happy_mode_checkbox').prop('checked', true);
    toggleDescriptionSections(true);
  } else {
    console.log('Disabling Happy Mode');
    $('.mes_happy_mode, #happy_mode_icon').css('color', 'red');
    $('#happy_mode_checkbox').prop('checked', false);
    toggleDescriptionSections(false);
  }
}

function checkCharacterName() {
  const characterName = $('.ch_name .name_text').text();
  console.log('Checking character name. Current name:', characterName);
  
  if (characterName.includes('Utamari')) {
    $('#happy_mode_extension').show();
    $('.mes_happy_mode').show();
  } else {
    $('#happy_mode_extension').hide();
    $('.mes_happy_mode').hide();
    happyModeEnabled = false;
    updateHappyMode();
  }
}
function toggleDescriptionSections(isHappyMode) {
  const descriptionTextarea = $('#description_textarea');
  let descriptionText = descriptionTextarea.val();
  const excludedSection = descriptionText.match(/{{\/\/[\s\S]*?}}/)[0];

  // Remove the excluded section from the description text
  descriptionText = descriptionText.replace(/{{\/\/[\s\S]*?}}/, '');

  descriptionText = descriptionText.replace(/^\n+/, '');

  descriptionText = descriptionText.replace(/{{\/\/\s*/g, '');
  descriptionText = descriptionText.replace(/\s*}}/g, '');

  if (isHappyMode) {
    descriptionText = descriptionText.replace(/^(\s*)<Normal>/gm, '$1{{// <Normal>');
    descriptionText = descriptionText.replace(/^(\s*)<\/Normal>/gm, '$1</Normal>}}');
    descriptionText = descriptionText.replace(/^(\s*){{\/\/\s*<Happy>/gm, '$1<Happy>');
    descriptionText = descriptionText.replace(/^(\s*)<\/Happy>}}/gm, '$1</Happy>');
  } else {
    descriptionText = descriptionText.replace(/^(\s*)<Happy>/gm, '$1{{// <Happy>');
    descriptionText = descriptionText.replace(/^(\s*)<\/Happy>/gm, '$1</Happy>}}');
    descriptionText = descriptionText.replace(/^(\s*){{\/\/\s*<Normal>/gm, '$1<Normal>');
    descriptionText = descriptionText.replace(/^(\s*)<\/Normal>}}/gm, '$1</Normal>');
  }

  descriptionText = excludedSection + '\n\n' + descriptionText;

  descriptionTextarea.val(descriptionText);
  descriptionTextarea.trigger('input');
}
jQuery(function () {
  addHappyModeToggle();
  addHappyModeMessageButton();
  
  setInterval(checkCharacterName, 5000);
  
  $(document).on('click', '.mes_happy_mode', function() {
    happyModeEnabled = !happyModeEnabled;
    updateHappyMode();
  });
});
