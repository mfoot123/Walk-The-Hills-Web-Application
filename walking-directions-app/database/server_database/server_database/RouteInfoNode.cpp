# include "RouteInfoNode.h"

RouteInfoNode::RouteInfoNode()
{
	day_ratings_count = 1;
	night_ratings_count = 1;
	// use 3 to avoid over or under preferancing a brand new route. overtime this metric will be averaged out.
	// under used route will have a mediocore score reflecting people's overall desire to use them.
	day_safe_rating = 3;
	night_safe_rating = 3;
	route_comments = std::vector<std::string>(100);
	time_searched = 0;
	time_walked = 0;
}


// basic destructor
RouteInfoNode::~RouteInfoNode()
{
}

// ToDo change flag to enum type or other fixed finite type.
void RouteInfoNode::addRating(int rating, int day_night_flag)
{
	if (day_night_flag == 0)
	{
		this->set_day_rating(rating);
		this->set_night_rating(rating);
		night_ratings_count++;
		day_ratings_count++;
	}
	else if (day_night_flag < 0)
	{
		this->set_night_rating(rating);
		night_ratings_count++;
	}
	else
	{
		this->set_day_rating(rating);
		day_ratings_count++;
	}
}

void RouteInfoNode::addComment(std::string comment)
{
	route_comments.push_back(comment);
}

float RouteInfoNode::get_safe_rating(int day_night_flag) const
{
	float rating = 0;

	if (day_night_flag == 0)
	{
		rating = (this->day_safe_rating + this->night_safe_rating) / 2;
	}
	else if (day_night_flag < 0)
	{
		rating = this->night_safe_rating;
	}
	else
	{
		rating = this->day_safe_rating;
	}

	return rating;
}

std::vector<std::string> RouteInfoNode::get_comments() const
{
	return this->route_comments;
}



void RouteInfoNode::set_night_rating(int rating)
{
	night_safe_rating = (night_safe_rating * night_ratings_count + rating) / (night_ratings_count + 1);
}
void RouteInfoNode::set_day_rating(int rating)
{
	day_safe_rating = (day_safe_rating * day_ratings_count + rating) / (day_ratings_count + 1);
}


void RouteInfoNode::update_node(int times_searched, int times_walked)
{
	this->time_searched += time_searched;
	this->time_walked += time_walked;
}

int RouteInfoNode::get_times_serched() const
{
	return this->time_searched;
}

int RouteInfoNode::get_times_walked() const
{
	return this->time_walked;
}

void RouteInfoNode::incriment_searched()
{
	this->time_searched++;
}

void RouteInfoNode::incriment_walked()
{
	this->time_walked++;
	this->time_searched++;
}

void RouteInfoNode::clear_walked()
{

	this->time_walked = 0;
}

void RouteInfoNode::clear_searched()
{
	this->time_searched = 0;
}

void RouteInfoNode::clear_comments()
{
	this->route_comments.clear();
}
