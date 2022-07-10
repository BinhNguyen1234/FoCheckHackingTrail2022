Component({
  props: {
    title: 'FoCheck',
    onTapActionButton: () => {},
  },

  methods: {
    _onTapActionButton() {
      this.props.onTapActionButton();
    },
  },
});
