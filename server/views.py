from flask import Blueprint, render_template
import requests
from .forms import MyForm


views = Blueprint('views', __name__)


@views.route('/', methods=('GET', 'POST'))
def home():
    form = MyForm()
    if form.validate_on_submit():
        params = form.to_request_params()
        res = requests.get('https://www.boredapi.com/api/activity', params=params)
        json = res.json()
        result = json.get('activity', json.get('error'))
        return render_template('index.html', form=form, result=result)
    return render_template('index.html', form=form)
