module PublicAgencyHelper
	
	def facebook_share_amount(url_shared)
		data = Net::HTTP.get(URI.parse("http://graph.facebook.com/?ids=#{URI.escape(url_shared)}"))
	    #data = {'url_shared' => "asdf", 'shares' => 1}
	    data = JSON.parse(data)	
	    #print("\n\n\n #{data} \n\n\n")
    	if data[url_shared]['shares']
    		return data[url_shared]['shares']
    	# 	return data['shares']
    	else
    		return 0
    	end
	end
end	
