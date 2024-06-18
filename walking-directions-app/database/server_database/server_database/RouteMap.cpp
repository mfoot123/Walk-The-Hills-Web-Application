# include "RouteMap.h"


RouteMap::RouteMap()
{
	this->mappedRouts = std::map<std::string, RouteInfoNode>();
}
RouteMap::~RouteMap()
{

}

std::map<std::string, std::vector<std::string>> RouteMap::get_all_comments() const
{
	std::map< std::string, std::vector<std::string>> comments;
	// loop over map and get all comments for each node.
	for (auto const& map_entry : this->mappedRouts)
	{
		std::vector<std::string> temp;
		temp = map_entry.second.get_comments();
		std::pair<std::string, std::vector<std::string>> new_mapping(map_entry.first, temp);
		comments.insert(new_mapping);
	}

	return comments;
}

void RouteMap::add_record(std::string route_name, std::string comment, int rating, int day_night_flag)
{
	if (route_name == "skip");
	std::map<std::string, RouteInfoNode>::iterator it = this->mappedRouts.find(route_name);
	if (it == this->mappedRouts.end())
	{
		// add the new route before adding its new comment and safety rating.
		this->add_new_route(route_name);
	}
	this->mappedRouts[route_name].addComment(comment);
	this->mappedRouts[route_name].addRating(rating, day_night_flag);
}

void RouteMap::add_comment_only(std::string route_name, std::string comment)
{
	std::map<std::string, RouteInfoNode>::iterator it = this->mappedRouts.find(route_name);
	if (it == this->mappedRouts.end())
	{
		// add the new route before adding its new comment and safety rating.
		this->add_new_route(route_name);
	}
	this->mappedRouts[route_name].addComment(comment);
}

float RouteMap::get_route_safety(std::string route_name, int day_night_flag)
{
	std::map<std::string, RouteInfoNode>::iterator it = this->mappedRouts.find(route_name);
	if (it == this->mappedRouts.end())
	{
		// invalid request.
		return -1;
	}
	else
	{
		return this->mappedRouts[route_name].get_safe_rating(day_night_flag);
	}
}

// return a map of route names to vectors of times walked and all safety ratings, general, day, night in that order.
// route_name, <times searched, times walked, general rating, day rating, night rating>
std::map<std::string, std::vector<float>> RouteMap::safety_report()
{
	std::map<std::string, std::vector<float>> safety_report;
	std::vector<float> temp;
	for (auto const& map_entry : this->mappedRouts)
	{
		temp.push_back(map_entry.second.get_times_serched());
		temp.push_back(map_entry.second.get_times_walked());
		temp.push_back(map_entry.second.get_safe_rating(0));
		temp.push_back(map_entry.second.get_safe_rating(1));
		temp.push_back(map_entry.second.get_safe_rating(-1));
		std::pair<std::string, std::vector<float>> temp_pair = std::pair<std::string, std::vector<float>>(map_entry.first, temp);
		safety_report.insert(temp_pair);
	}

	return safety_report;
}


void RouteMap::add_new_route(std::string route_name)
{
	RouteInfoNode* new_node = new RouteInfoNode();
	std::pair<std::string, RouteInfoNode> new_pair = std::pair<std::string, RouteInfoNode>(route_name, *new_node);
	this->mappedRouts.insert(new_pair);
}

void RouteMap::print_new_report()
{
	std::map< std::string, std::vector<std::string>> all_comments = this->get_all_comments();
	std::map<std::string, std::vector<float>> safety_report = this->safety_report();
	//get current system time.
	auto start = std::chrono::system_clock::now();
	auto legacyStart = std::chrono::system_clock::to_time_t(start);
	char tmBuff[30];
	ctime_s(tmBuff, sizeof(tmBuff), &legacyStart);

	std::ofstream report_file;
	std::string report_name(tmBuff);
	report_name += "_report.csv";
	// remove new line placed by ctime
	report_name.erase(std::remove(report_name.begin(), report_name.end(), '\n'), report_name.cend());
	report_name = "../" + report_name;
	std::replace(report_name.begin(), report_name.end(), ':', '_');

	report_file.open(report_name);
	report_file << "Street Name, Times Walked, Times Searched, Overall Safety Rating, Day Safety Rating, Night Safety Rating, Comments\n";
	for (auto it = safety_report.begin(); it != safety_report.end(); it++)
	{
		report_file << it->first << ',';
		report_file << it->second[0] << ',' << it->second[1] << ',' << it->second[2] << ',' << it->second[3] << ',' << it->second[4];
		std::vector<std::string> cur_comments = all_comments[it->first];
		for (int i = 0; i < cur_comments.size(); i++)
		{
			//ignore null/empty comments
			if (cur_comments[i] != "")
			{
				report_file << ", \"" << cur_comments[i] << "\"";
			}
		}
		report_file << "\n";
	}

	report_file.close();

}

void RouteMap::incriment_searched(std::string route_name)
{
	this->mappedRouts[route_name].incriment_searched();
}

void RouteMap::incriment_walked(std::string route_name)
{
	this->mappedRouts[route_name].incriment_walked();
}

void RouteMap::clear_comments()
{
	for (auto route : mappedRouts)
	{
		route.second.clear_comments();
	}
	
}

void RouteMap::clear_searched(std::string route_name)
{
	mappedRouts[route_name].clear_searched();
}

void RouteMap::clear_walked(std::string route_name)
{
	mappedRouts[route_name].clear_walked();
}
