from flask_wtf import FlaskForm
from wtforms import SelectField, DecimalRangeField, SubmitField


class MyForm(FlaskForm):
    participants = SelectField(
        'Participants',
        default=1.0,
        choices=(1, 2, 3, 4, 5, 8),
        description='The number of participants in the activity.'
    )
    type = SelectField(
        'Type',
        default="recreational",
        choices=(
            "recreational", "education", "social",
            "diy", "charity", "cooking",
            "relaxation", "music", "busywork"
        ),
        description='The type of activity.'
    )
    min_accessibility = DecimalRangeField(
        'Min.',
        description='The accessibility range.'
    )
    max_accessibility = DecimalRangeField(
        'Max.',
        description='A factor describing how possible an event is to do with zero being the most accessible.'
    )
    min_price = DecimalRangeField(
        'Min.',
        description='The price range.'
    )
    max_price = DecimalRangeField(
        'Max.',
        description='A factor describing the cost of the event with zero being free.'
    )
    submit = SubmitField('Search for activity')

    def to_request_params(self):
        return {
            'participants': self.participants.data,
            'minaccessibility': self.min_accessibility.data,
            'maxaccessibility': self.max_accessibility.data,
            'type': self.type.data,
            'minprice': self.min_price.data,
            'maxprice': self.max_price.data
        }
