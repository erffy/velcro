import { 
  BaseSelectMenuBuilder,

  RoleSelectMenuBuilder, UserSelectMenuBuilder, StringSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder 
} from "discord.js";

export default class Menu extends BaseSelectMenuBuilder {
  /**
   * Create new Select Menu.
   * @param {Partial<any> | ((menu: Menu) => unknown)} data
   * @constructor
   */
  constructor(data) {
    super((typeof data === "object" ? data : {}));

    if (typeof data === "function") data(this);
  };

  get disabled() {
    return (super.setDisabled(true));
  };

  /**
   * Sets the custom id for this Menu. 
   * @param {string} id 
   * @returns {this}
   *
   * @deprecated Please use 'setID' instead.
   * @private
   */
  setCustomId(id) {
    (deprecate(() => {}, "'setCustomId' is deprecated. Please use 'setID' instead."))();

    super.setCustomId(id);

    return this;
  };
  
  /**
   * Sets whether this button is disabled.
   * @param {boolean} disabled
   * @returns {this}
   *
   * @deprecated Please use 'disabled' instead.
   * @private
   */
  setDisabled(disabled) {
    (deprecate(() => { }, "'setDisabled' is deprecated. Please use 'disabled' instead."))();

    return (super.setDisabled(disabled));
  };

  /**
   * Sets the custom id for this Menu. 
   * @param {string} id 
   * @returns {this}
   */
  setID(id) {
    super.setCustomId(id);

    return this;
  };

  /**
   * @type typeof StringSelectMenuBuilder
   * @static
   */
  static StringMenu = StringSelectMenuBuilder;

  /**
   * @type typeof RoleSelectMenuBuilder
   * @static
   */
  static RoleMenu = RoleSelectMenuBuilder;

  /**
   * @type typeof UserSelectMenuBuilder
   * @static
   */
  static UserMenu = UserSelectMenuBuilder;

  /**
   * @type typeof StringSelectMenuBuilder
   * @static
   */
  static ChannelMenu = ChannelSelectMenuBuilder;

  /**
   * @type typeof MentionableSelectMenuBuilder
   * @static
   */
  static MentionMenu = MentionableSelectMenuBuilder;
};