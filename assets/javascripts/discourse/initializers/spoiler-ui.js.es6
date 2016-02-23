import { withPluginApi } from 'discourse/lib/plugin-api';
import { onToolbarCreate } from 'discourse/components/d-editor';

function priorToApi(container)
{
  const siteSettings = container.lookup('site-settings:main');

  if (siteSettings.spoiler_ui_enabled) {
    onToolbarCreate(toolbar => {
      toolbar.addButton({
        id: "spoiler_ui_button",
        group: "extras",
        icon: "eye-slash",
        perform: e => e.applySurround('[spoiler]', '[/spoiler]', 'spoiler_ui_default_text')
      });
    });
  }
}

function initializePlugin(api)
{
  const siteSettings = api.container.lookup('site-settings:main');

  if (siteSettings.spoiler_ui_enabled) {
    api.onToolbarCreate(toolbar => {
      toolbar.addButton({
        id: "spoiler_ui_button",
        group: "extras",
        icon: "eye-slash",
        perform: e => e.applySurround('[spoiler]', '[/spoiler]', 'spoiler_ui_default_text')
      });
    });
  }
}

export default
{
  name: 'spoiler-ui',
  initialize(container)
  {
    withPluginApi('0.1', api => initializePlugin(api), { noApi: () => priorToApi(container) });
  }
};