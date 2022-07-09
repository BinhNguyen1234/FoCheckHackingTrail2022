Component({
  props: {
    isLoading: false,
    type: 'vertical',
    skeletons: 0,
    className: '',
    products: [],
    onTapProduct: () => {},
  },

  methods: {
    _onTapProduct(product) {
      console.log(this.props)
      this.props.onTapProduct(product);
    },
  },
});
