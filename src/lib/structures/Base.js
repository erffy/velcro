import { ChannelType, ComponentType, CommandInteraction, ButtonStyle, Collection, WebhookClient } from "discord.js";

import Checker from "../client/Checker.js";

import Row from "../builders/Row.js";
import Attachment from "../builders/Attachment.js";
import Button from "../builders/Button.js";
import ContextCommand from "../builders/ContextCommand.js";
import Embed from "../builders/Embed.js";
import Menu from "../builders/Menu.js";
import Modal from "../builders/Modal.js";
import SlashCommand from "../builders/SlashCommand.js";
import TextInput from "../builders/TextInput.js";

import config from "../../bot.config.js";

/**
 * @abstract
 */
export default class Base {
  /**
   * @param {import("../client/Client").default} client
   * @constructor
   */
  constructor(client) {
    Object.defineProperty(this, 'client', { value: client, enumerable: false, configurable: false, writable: false });

    /**
     * @type typeof config
     * @readonly
     */
    this.config = config;

    /**
     * @type typeof SlashCommand
     * @readonly
     */
    this.SlashCommand = SlashCommand;

    /**
     * @type typeof ContextCommand
     * @readonly
     */
    this.ContextCommand = ContextCommand;

    /**
     * @type typeof Row
     * @readonly
     */
    this.Row = Row;

    /**
     * @type typeof Attachment
     * @readonly
     */
    this.Attachment = Attachment;

    /**
     * @type typeof Button
     * @readonly
     */
    this.Button = Button;

    /**
     * @type typeof Embed
     * @readonly
     */
    this.Embed = Embed;

    /**
     * @type typeof Menu
     * @readonly
     */
    this.Menu = Menu;

    /**
     * @type typeof TextInput
     * @readonly
     */
    this.TextInput = TextInput;

    /**
     * @type typeof Modal
     * @readonly
     */
    this.Modal = Modal;

    /**
     * @type typeof ChannelType
     * @readonly
     */
    this.ChannelType = ChannelType;

    /**
     * @type typeof ComponentType
     * @readonly
     */
    this.ComponentType = ComponentType;

    /**
     * @type Collection<string, number>
     * @readonly
     */
    this.cooldowns = new Collection();

    /**
     * @type WebhookClient
     * @readonly
     */
    this.webhook = new WebhookClient({ url: config.Bot.webhook });

    /**
     * @param {any} data 
     * @returns {Checker}
     * @readonly
     */
    this.check = (data) => (new Checker(data));
  };

  /**
   * Discord paginate system.
   * @param {CommandInteraction} interaction 
   * @param {{ embeds: EmbedBuilder[], buttons?: ButtonBuilder[] }} options 
   * @returns {Promise<void>}
   */
  async pagination(interaction, options = { embeds: [], buttons: [] }) {
    if (interaction && !(interaction instanceof CommandInteraction)) throw new TypeError(`'${interaction}' is not Command instance.`);

    let { embeds, buttons } = options;
    embeds ??= [];
    buttons ??= [];

    const efirst = this.client.emojis.resolve("1120715842343153785");
    const eprev = this.client.emojis.resolve("1120715895157825597");
    const edel = this.client.emojis.resolve("1120716005572886528");
    const enext = this.client.emojis.resolve("1120715853558722663");
    const elast = this.client.emojis.resolve("1120715799011795036");

    const first = new this.Button((button) => button.setStyle(ButtonStyle.Secondary).setEmoji({ name: efirst.name, id: efirst.id }).setID("0"));
    const prev = new this.Button((button) => button.setStyle(ButtonStyle.Primary).setEmoji({ name: eprev.name, id: eprev.id }).setID("1"));
    const del = new this.Button((button) => button.setStyle(ButtonStyle.Danger).setEmoji({ name: edel.name, id: edel.id }).setID("2"));
    const next = new this.Button((button) => button.setStyle(ButtonStyle.Primary).setEmoji({ name: enext.name, id: enext.id }).setID("3"));
    const last = new this.Button((button) => button.setStyle(ButtonStyle.Secondary).setEmoji({ name: elast.name, id: elast.id }).setID("4"));

    const buttonsRow = new this.Row({ components: [first, prev, del, next, last] });

    let currentPage = 0;

    const disableFirst = first.from((button) => button.setStyle(ButtonStyle.Danger)).disabled;
    const disableLast = last.from((button) => button.setStyle(ButtonStyle.Danger)).disabled;
    const disablePrev = prev.from((button) => button.setStyle(ButtonStyle.Danger)).disabled;
    const disableNext = next.from((button) => button.setStyle(ButtonStyle.Danger)).disabled;

    const styledDelete = del.from((button) => button.setStyle(ButtonStyle.Success)).disabled;

    /**
     * @type Array<Row>
     */
    let components = [
      new Row({
        components: [
          (currentPage === 0) ? disableFirst : first,
          (currentPage === 0) ? disablePrev : prev,
          (currentPage === 0) || (embeds.length - 1) ? styledDelete : del,
          (currentPage === (embeds.length - 1)) ? disableNext : next,
          (currentPage === (embeds.length - 1)) ? disableLast : last
        ]
      })
    ];
    components.push(...buttons);

    let sendMessage;

    if (embeds.length < 1) {
      if (interaction.deferred) return interaction.followUp({ embeds: [embeds[0]], components });
      else sendMessage = interaction.replied ? await interaction.editReply({ embeds: [embeds[0]], components }) : await interaction.reply({ embeds: [embeds[0]], components });
    };

    embeds = embeds.map((embed, _index) => embed.setFooter({ text: `Total: ${embeds.length} | Viewing: ${_index + 1} | Remaining: ${(embeds.length - (_index + 1))}`, iconURL: interaction.guild?.iconURL() }));

    if (interaction.deferred) sendMessage = await interaction.followUp({ embeds: [embeds[0]], components });
    else sendMessage = interaction.replied ? await interaction.editReply({ embeds: [embeds[0]], components }) : await interaction.reply({ embeds: [embeds[0]], components });

    let filter = async (m) => {
      if (interaction.member.id !== m.member.id) await interaction.followUp({ content: `${this.config.Emoji.State.ERROR} ${m.member}, You cannot interact with this buttons.`, ephemeral: true });

      return (interaction.member.id === m.member.id);
    };

    const collector = sendMessage.createMessageComponentCollector({ componentType: ComponentType.Button, filter });

    collector.on("collect", async (i) => {
      let { customId: id } = i;

      await i.deferUpdate();

      if (id === "0") {
        currentPage = 0;

        let components = [
          new Row({
            components: [
              (currentPage === 0) ? disableFirst : first,
              (currentPage === 0) ? disablePrev : prev,
              (currentPage === 0) ? styledDelete : del,
              (currentPage === (embeds.length - 1)) ? disableNext : next,
              (currentPage === (embeds.length - 1)) ? disableLast : last
            ]
          })
        ];

        components.push(...buttons);

        await sendMessage.edit({ embeds: [embeds[currentPage]], components });
      } else if (id === "1") {
        if (currentPage !== 0) {
          currentPage--;

          let components = [
            new Row({
              components: [
                (currentPage === 0) ? disableFirst : first,
                (currentPage === 0) ? disablePrev : prev,
                (currentPage === 0) ? styledDelete : del,
                (currentPage === (embeds.length - 1)) ? disableNext : next,
                (currentPage === (embeds.length - 1)) ? disableLast : last
              ]
            })
          ];
          components.push(...buttons);

          await sendMessage.edit({ embeds: [embeds[currentPage]], components });
        } else {
          currentPage = ((embeds.length - 1));

          let components = [
            new Row({
              components: [
                (currentPage === 0) ? disableFirst : first,
                (currentPage === 0) ? disablePrev : prev,
                (currentPage === 0) ? styledDelete : del,
                (currentPage === (embeds.length - 1)) ? disableNext : next,
                (currentPage === (embeds.length - 1)) ? disableLast : last
              ]
            })
          ];
          components.push(...buttons);

          await sendMessage.edit({ embeds: [embeds[currentPage]], components });
        };
      } else if (id === "2") {
        components[0].components.map((button) => button.disabled.setStyle(ButtonStyle.Secondary));

        await sendMessage.edit({ embeds: [embeds[currentPage]], components });
      } else if (id === "3") {
        if (currentPage < (embeds.length - 1)) {
          currentPage++;

          const components = [
            new Row({
              components: [
                (currentPage === 0) ? disableFirst : first,
                (currentPage === 0) ? disablePrev : prev,
                (currentPage === (embeds.length - 1)) ? styledDelete : del,
                (currentPage === (embeds.length - 1)) ? disableNext : next,
                (currentPage === (embeds.length - 1)) ? disableLast : last
              ]
            })
          ];
          components.concat(buttons);

          await sendMessage.edit({ embeds: [embeds[currentPage]], components }).catch(() => { });
        } else {
          currentPage = 0;

          const components = [
            new Row({
              components: [
                (currentPage === 0) ? disableFirst : first,
                (currentPage === 0) ? disablePrev : prev,
                (currentPage === 0) || (embeds.length - 1) ? styledDelete : del,
                (currentPage === (embeds.length - 1)) ? disableNext : next,
                (currentPage === (embeds.length - 1)) ? disableLast : last
              ]
            })
          ];

          components.concat(buttons);

          await sendMessage.edit({ embeds: [embeds[currentPage]], components }).catch(() => { });
        };
      } else if (id === "4") {
        currentPage = ((embeds.length - 1));

        let components = [
          new Row({
            components: [
              (currentPage === 0) ? disableFirst : first,
              (currentPage === 0) ? disablePrev : prev,
              (currentPage === (embeds.length - 1)) ? styledDelete : del,
              (currentPage === (embeds.length - 1)) ? disableNext : next,
              (currentPage === (embeds.length - 1)) ? disableLast : last
            ]
          })
        ];

        components.push(...buttons);

        await sendMessage.edit({ embeds: [embeds[currentPage]], components });
      };
    });

    collector.on("end", async () => {
      components[0].components.map((button) => button.disabled.setStyle(ButtonStyle.Secondary));

      await sendMessage.edit({ embeds: [embeds[0]], components });
    });

    return void 0;
  };
};